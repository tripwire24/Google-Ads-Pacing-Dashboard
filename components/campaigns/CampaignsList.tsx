
import React from 'react';
import { Campaign } from '../../types';
import CampaignCard from './CampaignCard';

interface CampaignsListProps {
  campaigns: Campaign[];
  selectedCampaignId: string | null;
  onSelectCampaign: (id: string) => void;
  isAccountSelected: boolean;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ campaigns, selectedCampaignId, onSelectCampaign, isAccountSelected }) => {
  return (
    <div className="bg-gray-200 h-full flex flex-col border-r border-gray-300">
      <div className="sticky top-0 bg-gray-200/80 backdrop-blur-sm p-4 z-10 border-b border-gray-300">
        <h2 className="text-xl font-bold text-gray-700">Campaigns</h2>
      </div>
      <div className="overflow-y-auto flex-grow">
        {!isAccountSelected ? (
          <div className="flex items-center justify-center h-full text-center text-gray-500 p-4">
            <p>Select an account to view campaigns.</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center text-gray-500 p-4">
            <p>No campaigns found for this account.</p>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              isSelected={campaign.id === selectedCampaignId}
              onSelect={() => onSelectCampaign(campaign.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignsList;
