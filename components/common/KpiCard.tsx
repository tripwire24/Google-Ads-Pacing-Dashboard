
import React from 'react';

interface KpiCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, title, value, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-400 text-xs mt-1">{description}</p>
      </div>
    </div>
  );
};

export default KpiCard;
