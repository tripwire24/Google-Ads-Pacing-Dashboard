
import { useState, useEffect, useCallback } from 'react';
import { Account, Campaign, PacingStatus, RawSheetRow } from '../types';
import { SPREADSHEET_ID, SHEET_NAME } from '../constants';

const parseCurrency = (value: string): number => {
  if (!value || typeof value !== 'string') return 0;
  return parseFloat(value.replace(/[$,]/g, '')) || 0;
};

const parsePercentage = (value: string): number => {
    if (!value || typeof value !== 'string') return 0;
    return parseFloat(value.replace('%', '')) / 100 || 0;
};

const parseInteger = (value: string): number => {
    if (!value || typeof value !== 'string') return 0;
    return parseInt(value.replace(/,/g, ''), 10) || 0;
};


const calculatePacingStatus = (pacing: number): PacingStatus => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysElapsed = today.getDate();
    const idealPacing = daysElapsed / daysInMonth;

    if (pacing > 1.0) return PacingStatus.OverBudget;
    if (pacing > idealPacing * 1.1) return PacingStatus.OverPacing;
    if (pacing < idealPacing * 0.9) return PacingStatus.UnderPacing;
    return PacingStatus.OnTrack;
};


export const useGoogleSheetsData = (apiKey: string | undefined) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const processData = useCallback((data: { values: RawSheetRow[] }) => {
    const campaigns: Campaign[] = [];
    // Skip header row by starting at index 1
    for (let i = 1; i < data.values.length; i++) {
        const row = data.values[i];
        if (!row || !row[4] || !row[7]) continue; // Skip if no account or campaign name

        const spend = parseCurrency(row[17]);
        const budget = parseCurrency(row[14]);
        const pacing = budget > 0 ? spend / budget : 0;
        
        const campaign: Campaign = {
            id: `${row[4]}-${row[7]}-${i}`, // Create a unique ID
            accountName: row[4],
            accountId: row[4],
            name: row[7],
            spend,
            budget,
            dailyBudget: parseCurrency(row[15]),
            impressions: parseInteger(row[18]),
            clicks: parseInteger(row[19]),
            conversions: parseInteger(row[20]),
            convValue: parseCurrency(row[21]),
            roas: parsePercentage(row[22]),
            ctr: parsePercentage(row[25]),
            pacing,
            pacingStatus: calculatePacingStatus(pacing),
        };
        campaigns.push(campaign);
    }
    
    const accountMap = new Map<string, Account>();
    campaigns.forEach(campaign => {
        let account = accountMap.get(campaign.accountName);
        if (!account) {
            account = {
                id: campaign.accountName,
                name: campaign.accountName,
                campaigns: [],
                spend: 0,
                budget: 0,
                dailyBudget: 0,
                impressions: 0,
                clicks: 0,
                conversions: 0,
                convValue: 0,
                ctr: 0,
                roas: 0,
                pacing: 0,
                pacingStatus: PacingStatus.OnTrack,
            };
        }
        account.campaigns.push(campaign);
        account.spend += campaign.spend;
        account.budget += campaign.budget;
        account.dailyBudget += campaign.dailyBudget;
        account.impressions += campaign.impressions;
        account.clicks += campaign.clicks;
        account.conversions += campaign.conversions;
        account.convValue += campaign.convValue;
        
        accountMap.set(campaign.accountName, account);
    });

    const aggregatedAccounts: Account[] = Array.from(accountMap.values()).map(acc => {
        const pacing = acc.budget > 0 ? acc.spend / acc.budget : 0;
        const ctr = acc.impressions > 0 ? acc.clicks / acc.impressions : 0;
        const roas = acc.spend > 0 ? acc.convValue / acc.spend : 0;
        return { ...acc, pacing, pacingStatus: calculatePacingStatus(pacing), ctr, roas };
    });

    setAccounts(aggregatedAccounts);
  }, []);

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        processData(data);
      } catch (e: any) {
        setError(e.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, processData]);

  return { accounts, loading, error };
};
