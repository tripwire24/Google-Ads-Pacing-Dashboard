import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useGoogleSheetsData } from './hooks/useGoogleSheetsData';
import { Account, Campaign } from './types';
import AccountsList from './components/accounts/AccountsList';
import CampaignsList from './components/campaigns/CampaignsList';
import DashboardView from './components/dashboard/DashboardView';
import Spinner from './components/common/Spinner';
import ErrorDisplay from './components/common/ErrorDisplay';

const App: React.FC = () => {
  const apiKey = process.env.ads_dashboard_api;
  const { accounts: initialAccounts, loading, error } = useGoogleSheetsData(apiKey);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [focusedColumn, setFocusedColumn] = useState<'accounts' | 'campaigns'>('accounts');
  
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (initialAccounts.length > 0) {
      setAccounts(initialAccounts);
      if (isInitialLoad.current) {
        setSelectedAccountId(initialAccounts[0].id);
        isInitialLoad.current = false;
      }
    }
  }, [initialAccounts]);

  const selectedAccount = useMemo(() => 
    accounts.find(acc => acc.id === selectedAccountId), 
    [accounts, selectedAccountId]
  );

  const selectedCampaign = useMemo(() => 
    selectedAccount?.campaigns.find(camp => camp.id === selectedCampaignId),
    [selectedAccount, selectedCampaignId]
  );
  
  const handleSelectAccount = (accountId: string) => {
    setSelectedAccountId(accountId);
    setSelectedCampaignId(null);
    setFocusedColumn('campaigns');
  };

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaignId(prevId => (prevId === campaignId ? null : campaignId));
  };
  
  if (!apiKey) {
    return <ErrorDisplay title="Configuration Error" message="API key is missing. Please set the 'ads_dashboard_api' environment variable." />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <Spinner />
        <span className="ml-4 text-xl">Loading Pacing Data...</span>
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay title="Failed to Load Data" message={error} />;
  }

  return (
    <div className="flex h-screen font-sans antialiased overflow-hidden bg-gray-100">
      {/* Accounts Column */}
      <div 
        className={`transition-all duration-500 ease-in-out ${focusedColumn === 'accounts' ? 'w-[35%]' : 'w-[25%]'}`}
        onClick={() => setFocusedColumn('accounts')}
      >
        <AccountsList 
          accounts={accounts}
          setAccounts={setAccounts}
          selectedAccountId={selectedAccountId}
          onSelectAccount={handleSelectAccount}
        />
      </div>

      {/* Campaigns Column */}
      <div 
        className={`transition-all duration-500 ease-in-out ${focusedColumn === 'campaigns' ? 'w-[35%]' : 'w-[25%]'}`}
        onClick={() => setFocusedColumn('campaigns')}
      >
        <CampaignsList 
          campaigns={selectedAccount?.campaigns ?? []}
          selectedCampaignId={selectedCampaignId}
          onSelectCampaign={handleSelectCampaign}
          isAccountSelected={!!selectedAccount}
        />
      </div>

      {/* Dashboard Column */}
      <div className="w-[40%] flex-shrink-0 bg-gray-50 p-4 lg:p-6 overflow-y-auto">
        <DashboardView 
          item={selectedCampaign || selectedAccount} 
          type={selectedCampaign ? 'Campaign' : 'Account'}
        />
      </div>
    </div>
  );
};

export default App;