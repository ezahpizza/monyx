
import api from './baseApi';
import type { FinancialSummary, CategoryData, TrendData, SpendingHabitsAnalysis } from '../types/APITypes';

export const analyticsAPI = {
  getFinancialSummary: async (userId: string, filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<FinancialSummary> => {
    const response = await api.get('/api/analytics/summary', { params: { ...filters, userId } });
    return response.data;
  },

  getCategoryData: async (userId: string, filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<CategoryData[]> => {
    const response = await api.get('/api/analytics/categories', { params: { ...filters, userId } });
    return response.data;
  },

  getTrendData: async (userId: string, filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<TrendData[]> => {
    const response = await api.get('/api/analytics/trends', { params: { ...filters, userId } });
    return response.data;
  },

  getSpendingHabits: async (userId: string): Promise<SpendingHabitsAnalysis> => {
    const response = await api.get('/api/analytics/habits', { params: { userId } });
    return response.data;
  },

  // Removed spending habits API
};
