
import React from 'react';
import { Account, Campaign } from '../../types';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/formatters';
import { ICONS } from '../../constants';
import KpiCard from '../common/KpiCard';
import SpendBudgetBarChart from './SpendBudgetBarChart';
import PacingChart from './PacingChart';
import PacingAnalysis from './PacingAnalysis';

interface DashboardViewProps {
  item: Account | Campaign | null | undefined;
  type: 'Account' | 'Campaign';
}

const DashboardView: React.FC<DashboardViewProps> = ({ item, type }) => {
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p className="text-lg">Select an account or campaign to see the details.</p>
      </div>
    );
  }

  const cpa = item.conversions > 0 ? item.spend / item.conversions : 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">{type} Dashboard</p>
        <h1 className="text-4xl font-bold text-gray-800 truncate">{item.name}</h1>
      </div>

      <PacingChart 
        spend={item.spend}
        budget={item.budget}
        pacing={item.pacing}
        status={item.pacingStatus}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={ICONS.conversions}
          title="Total Conversions"
          value={formatNumber(item.conversions, 2)}
          description="Total successful actions"
        />
        <KpiCard
          icon={ICONS.cpa}
          title="Cost / Conversion"
          value={formatCurrency(cpa)}
          description="Average cost per action"
        />
        <KpiCard
          icon={ICONS.ctr}
          title="Click-Through Rate"
          value={formatPercentage(item.ctr, 2)}
          description="Clicks vs. Impressions"
        />
        <KpiCard
          icon={ICONS.roas}
          title="Return on Ad Spend"
          value={`${(item.roas * 100).toFixed(0)}%`}
          description="Conversion value vs. Spend"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Spend vs. Budget</h3>
        <SpendBudgetBarChart spend={item.spend} budget={item.budget} />
      </div>

      <PacingAnalysis status={item.pacingStatus} pacing={item.pacing} />
    </div>
  );
};

export default DashboardView;
