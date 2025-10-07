
import React, { useState } from 'react';
import { PacingStatus } from '../../types';
import { ICONS } from '../../constants';
import { formatPercentage } from '../../utils/formatters';

interface PacingAnalysisProps {
  status: PacingStatus;
  pacing: number;
}

const analysisContent = {
  [PacingStatus.OnTrack]: {
    summary: "Performance is on track.",
    recommendation: "Current strategy is effective. Continue monitoring performance and maintain the current daily budget and bidding strategy."
  },
  [PacingStatus.UnderPacing]: {
    summary: "This campaign is under-pacing and may not spend its full budget.",
    recommendation: "Consider increasing the daily budget or expanding targeting options to reach a wider audience. Review ad creatives and keywords for potential improvements."
  },
  [PacingStatus.OverPacing]: {
    summary: "This campaign is over-pacing and might exhaust its budget before the end of the month.",
    recommendation: "Consider decreasing the daily budget or refining targeting to be more restrictive. Analyze high-cost keywords or placements that could be optimized."
  },
  [PacingStatus.OverBudget]: {
    summary: "The budget has been fully spent for this period.",
    recommendation: "No immediate action is needed unless you wish to increase the overall budget. Analyze performance to inform the next budget cycle."
  }
};

const PacingAnalysis: React.FC<PacingAnalysisProps> = ({ status, pacing }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = analysisContent[status];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      <button 
        className="w-full flex justify-between items-center p-4 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-700">Pacing Analysis</h3>
        <span className={`${isExpanded ? 'rotate-180' : ''}`}>{ICONS.chevronDown}</span>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-gray-600">
          <p className="font-medium">
            At <span className="font-bold">{formatPercentage(pacing)}</span> of budget spent, {content.summary}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800">Recommendation:</h4>
            <p className="mt-1">{content.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacingAnalysis;
