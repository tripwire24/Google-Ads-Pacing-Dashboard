
import React from 'react';
import { Account } from '../../types';
import PacingIndicator from '../common/PacingIndicator';
import PacingBar from '../common/PacingBar';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface AccountCardProps {
  account: Account;
  isSelected: boolean;
  onSelect: () => void;
  draggableProps: object;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, isSelected, onSelect, draggableProps }) => {
  return (
    <div
      onClick={onSelect}
      {...draggableProps}
      className={`p-4 m-2 rounded-lg shadow-sm cursor-pointer transition-all duration-200 border-2 ${
        isSelected ? 'bg-blue-50 border-blue-400 shadow-md' : 'bg-white border-transparent hover:bg-gray-50 hover:shadow'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800 truncate pr-2 flex-1">{account.name}</h3>
        <PacingIndicator status={account.pacingStatus} />
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>Pacing</span>
          <span className="font-bold text-gray-800">{formatPercentage(account.pacing, 1)}</span>
        </div>
        <PacingBar percentage={account.pacing} status={account.pacingStatus} />
      </div>
      
      <div className="mt-3 text-xs text-gray-500 grid grid-cols-3 gap-x-2">
        <div>
          <p>Spend:</p>
          <p className="font-semibold text-gray-700">{formatCurrency(account.spend)}</p>
        </div>
        <div>
          <p>Budget:</p>
          <p className="font-semibold text-gray-700">{formatCurrency(account.budget)}</p>
        </div>
        <div>
          <p>Daily Budget:</p>
          <p className="font-semibold text-gray-700">{formatCurrency(account.dailyBudget)}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
