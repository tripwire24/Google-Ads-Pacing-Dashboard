import React from 'react';
import { formatCurrency } from '../../utils/formatters';

// Use Recharts from global scope
declare const Recharts: any;

interface SpendBudgetBarChartProps {
  spend: number;
  budget: number;
}

const SpendBudgetBarChart: React.FC<SpendBudgetBarChartProps> = ({ spend, budget }) => {
  // Defer accessing Recharts until render time to ensure the script has loaded.
  if (typeof Recharts === 'undefined' || !Recharts) {
    return (
      <div style={{ width: '100%', height: 200 }} className="flex items-center justify-center text-gray-500">
        Loading chart library...
      </div>
    );
  }
  
  const { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } = Recharts;

  const data = [
    { name: 'Spend vs Budget', Spend: spend, Budget: budget },
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded shadow-lg">
          <p className="text-blue-500">{`Spend: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-gray-400">{`Budget: ${formatCurrency(payload[1].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }}/>
          <Bar dataKey="Budget" fill="#E5E7EB" stackId="a" radius={[10, 10, 10, 10]} />
          <Bar dataKey="Spend" fill="#3B82F6" stackId="a" radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendBudgetBarChart;