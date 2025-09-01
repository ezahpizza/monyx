import { ChartsProps } from '@/types/chartTypes';
import { PieChartComponent, LineChartComponent } from '../charts';

export const Charts = ({ categoryData, trendData, isLoading }: ChartsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PieChartComponent data={categoryData} isLoading={isLoading} />
      <LineChartComponent data={trendData} isLoading={isLoading} />
    </div>
  );
}

