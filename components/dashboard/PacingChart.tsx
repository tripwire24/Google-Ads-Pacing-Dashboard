
import React from 'react';
import { PacingStatus } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface PacingChartProps {
  spend: number;
  budget: number;
  pacing: number;
  status: PacingStatus;
}

const PacingChart: React.FC<PacingChartProps> = ({ spend, budget, pacing, status }) => {
  const width = Math.min(pacing * 100, 100);

  const colorClasses = {
    [PacingStatus.OnTrack]: { bar: 'bg-green-500', text: 'text-green-600' },
    [PacingStatus.UnderPacing]: { bar: 'bg-yellow-500', text: 'text-yellow-600' },
    [PacingStatus.OverPacing]: { bar: 'bg-orange-500', text: 'text-orange-600' },
    [PacingStatus.OverBudget]: { bar: 'bg-red-600', text: 'text-red-700' },
  };

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysElapsed = today.getDate();
  const idealPosition = (daysElapsed / daysInMonth) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-semibold text-gray-700">Monthly Pacing</h3>
        <span className={`text-2xl font-bold ${colorClasses[status].text}`}>{formatPercentage(pacing)}</span>
      </div>
      <p className={`text-sm ${colorClasses[status].text}`}>{status}</p>

      <div className="relative mt-4">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`${colorClasses[status].bar} h-4 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${width}%` }}
          />
        </div>
        <div 
            className="absolute top-0 h-full flex flex-col items-center group"
            style={{ left: `calc(${idealPosition}% - 8px)` }}
        >
            <div className="h-4 w-1 bg-gray-800 rounded-full"></div>
            <div className="absolute -top-6 text-xs bg-gray-800 text-white px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Ideal
            </div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{formatCurrency(spend)} Spent</span>
        <span>{formatCurrency(budget)} Budget</span>
      </div>
    </div>
  );
};

export default PacingChart;
