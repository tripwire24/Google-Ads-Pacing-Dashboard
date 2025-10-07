
import React from 'react';
import { PacingStatus } from '../../types';
import { ICONS } from '../../constants';

interface PacingIndicatorProps {
  status: PacingStatus;
}

const statusConfig = {
  [PacingStatus.OnTrack]: {
    color: 'text-green-500',
    icon: ICONS.check,
    tooltip: 'Pacing on track.',
  },
  [PacingStatus.UnderPacing]: {
    color: 'text-yellow-500',
    icon: ICONS.warning,
    tooltip: 'Pacing behind schedule.',
  },
  [PacingStatus.OverPacing]: {
    color: 'text-red-500',
    icon: ICONS.warning,
    tooltip: 'Pacing ahead of schedule.',
  },
  [PacingStatus.OverBudget]: {
    color: 'text-red-700',
    icon: ICONS.warning,
    tooltip: 'Expenditure has exceeded budget.',
  },
};

const PacingIndicator: React.FC<PacingIndicatorProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <div className={`relative group flex items-center ${config.color}`}>
      {config.icon}
      <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        {config.tooltip}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default PacingIndicator;
