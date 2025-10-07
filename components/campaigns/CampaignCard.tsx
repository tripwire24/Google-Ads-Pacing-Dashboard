
import React from 'react';
import { Campaign } from '../../types';
import PacingIndicator from '../common/PacingIndicator';
import PacingBar from '../common/PacingBar';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';

interface CampaignCardProps {
  campaign: Campaign;
  isSelected: boolean;
  onSelect: () => void;
}

const MetricItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between text-xs py-1 border-b border-gray-200 last:border-b-0">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`m-2 rounded-lg shadow-sm cursor-pointer transition-all duration-200 border-2 ${
        isSelected ? 'bg-blue-50 border-blue-400 shadow-md' : 'bg-white border-transparent hover:bg-gray-50 hover:shadow'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-gray-800 truncate pr-2 flex-1">{campaign.name}</h3>
          <PacingIndicator status={campaign.pacingStatus} />
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>Pacing</span>
            <span className="font-bold text-gray-800">{formatPercentage(campaign.pacing, 1)}</span>
          </div>
          <PacingBar percentage={campaign.pacing} status={campaign.pacingStatus} />
        </div>
        
        <div className="mt-3 text-xs text-gray-500 grid grid-cols-3 gap-x-2">
          <div>
            <p>Spend:</p>
            <p className="font-semibold text-gray-700">{formatCurrency(campaign.spend)}</p>
          </div>
          <div>
            <p>Budget:</p>
            <p className="font-semibold text-gray-700">{formatCurrency(campaign.budget)}</p>
          </div>
          <div>
            <p>Daily Budget:</p>
            <p className="font-semibold text-gray-700">{formatCurrency(campaign.dailyBudget)}</p>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="bg-gray-100 p-4 rounded-b-lg border-t border-gray-200">
          <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Performance Metrics</h4>
          <div className="space-y-1">
            <MetricItem label="Impressions" value={formatNumber(campaign.impressions)} />
            <MetricItem label="Clicks" value={formatNumber(campaign.clicks)} />
            <MetricItem label="Conversions" value={formatNumber(campaign.conversions, 2)} />
            <MetricItem label="Conv. Value" value={formatCurrency(campaign.convValue)} />
            <MetricItem label="CTR" value={formatPercentage(campaign.ctr, 2)} />
            <MetricItem label="ROAS" value={formatPercentage(campaign.roas, 0)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignCard;
