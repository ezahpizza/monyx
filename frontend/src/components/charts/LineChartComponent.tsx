import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { LineChartComponentProps } from '@/types/chartTypes';
import { formatDateDMY } from '@/lib/utils';

const LineChartComponent = ({ data, isLoading }: LineChartComponentProps) => {

    const formattedData = data.map(item => ({
    ...item,
    date: formatDateDMY(item.date)
  }));

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover-lift transition-smooth">
        <div className="pb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5 text-primary" />
            Spending Trends
          </h3>
          <p className="text-sm text-gray-600">Daily spending over time</p>
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
      <div className="bg-white rounded-lg shadow-md p-4 hover-lift transition-smooth">
        <div className="pb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5 text-primary" />
            Spending Trends
          </h3>
          <p className="text-sm text-gray-600">Daily spending over time</p>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-center justify-center text-black">
            No trend data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orchide rounded-lg shadow-md p-4">
      <div className="pb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUp className="h-5 w-5 text-primary" />
          Spending Trends
        </h3>
        <p className="text-sm text-gray-600">Daily spending over time</p>
      </div>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={formattedData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#9085bc" />
            <XAxis dataKey="date" scale="band" stroke="#3b395d" fontSize={12} />
            <YAxis stroke="#3b395d" fontSize={12} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card rounded-lg p-3 shadow-lg">
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
              }}
            />
            <Legend />
            {/* Bar for total, Area for total. You can adjust dataKey as needed. */}
            <Bar dataKey="total" barSize={20} fill="#f2cbe0" />
            <Area type="monotone" dataKey="total" stroke="#3b395d" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
