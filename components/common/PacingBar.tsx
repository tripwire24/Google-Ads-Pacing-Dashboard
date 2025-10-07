
import React from 'react';
import { PacingStatus } from '../../types';

interface PacingBarProps {
  percentage: number;
  status: PacingStatus;
}

const PacingBar: React.FC<PacingBarProps> = ({ percentage, status }) => {
  const width = Math.min(percentage * 100, 100);

  const colorClass = {
    [PacingStatus.OnTrack]: 'bg-green-500',
    [PacingStatus.UnderPacing]: 'bg-yellow-500',
    [PacingStatus.OverPacing]: 'bg-orange-500',
    [PacingStatus.OverBudget]: 'bg-red-600',
  }[status];

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysElapsed = today.getDate();
  const idealPosition = (daysElapsed / daysInMonth) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 relative my-1">
      <div
        className={`${colorClass} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${width}%` }}
      ></div>
      <div 
        className="absolute top-0 h-full w-0.5 bg-gray-700 opacity-70"
        style={{ left: `${idealPosition}%` }}
        title={`Ideal pace: ${idealPosition.toFixed(1)}%`}
      ></div>
    </div>
  );
};

export default PacingBar;
