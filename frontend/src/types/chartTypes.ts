import { CategoryData, TrendData } from '@/types/APITypes';

export interface ChartsProps {
  categoryData: CategoryData[];
  trendData: TrendData[];
  isLoading?: boolean;
}

export interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export interface PieChartComponentProps {
  data: CategoryData[];
  isLoading?: boolean;
}

export interface LineChartComponentProps {
  data: TrendData[];
  isLoading?: boolean;
}