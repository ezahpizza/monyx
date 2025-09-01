import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChartComponentProps, CustomTooltipProps } from '@/types/chartTypes';

const COLORS = [
  '#290e7a', 
  '#ff4632',  
  '#f661ae', 
  '#fdfeaf',    
  '#c0e2ff',  
  '#099ea9', 
  '#a7f9ac',  
];

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

const PieChartComponent = ({ data, isLoading }: PieChartComponentProps) => {
  if (isLoading) {
    return (
      <div className="bg-lavenda rounded-lg shadow-md p-4">
        <div className="pb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <PieChartIcon className="h-5 w-5 text-primary" />
            Spending by Category
          </h3>
          <p className="text-sm text-gray-600">Your expense breakdown</p>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-lavenda rounded-lg shadow-md p-4">
        <div className="pb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <PieChartIcon className="h-5 w-5 text-primary" />
            Spending by Category
          </h3>
          <p className="text-sm text-gray-600">Your expense breakdown</p>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-center justify-center text-black">
            No spending data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-lavenda rounded-lg shadow-md p-4">
      <div className="pb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <PieChartIcon className="h-5 w-5 text-primary" />
          Spending by Category
        </h3>
        <p className="text-sm text-gray-600">Your expense breakdown</p>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="total"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-black truncate">
                {entry.name}: ${entry.total.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
