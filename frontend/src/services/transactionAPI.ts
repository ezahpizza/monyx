
import api from './baseApi';
import { Transaction, ParsedTransaction } from '../types/APITypes';

export const transactionAPI = {
  parseTransaction: async (text: string): Promise<ParsedTransaction> => {
    const response = await api.post('/api/transactions/parse', { text });
    return response.data;
  },

  createTransaction: async (transaction: Omit<Transaction, '_id' | 'userId' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Transaction> => {
    const payload = { ...transaction, userId };
    const response = await api.post('/api/transactions', payload);
    return response.data;
  },

  getTransactions: async (userId: string, filters?: {
    category?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<Transaction[]> => {
    const response = await api.get('/api/transactions', { params: { ...filters, userId } });
    return response.data;
  },

  updateTransaction: async (id: string, updates: Partial<Transaction>, userId: string): Promise<Transaction> => {
    const response = await api.put(`/api/transactions/${id}`, { ...updates, userId });
    return response.data;
  },

  deleteTransaction: async (id: string, userId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/api/transactions/${id}`, { data: { userId } });
    return response.data;
  },
};
