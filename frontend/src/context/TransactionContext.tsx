import { createContext, useEffect, useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { transactionAPI } from '@/services/transactionAPI';
import { analyticsAPI } from '@/services/analyticsAPI';
import { Transaction, ParsedTransaction, FinancialSummary, CategoryData, TrendData } from '@/types/APITypes';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';


import { TransactionFilters, TransactionContextType, TransactionProviderProps } from '@/types/txnTypes';
// Helper to get start and end dates for period
function getDefaultPeriodDates() {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const endDate = new Date().toISOString().slice(0, 10);
  return { startDate, endDate };
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);
export { TransactionContext };

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>(getDefaultPeriodDates());

  const { user } = useAuth();
  const { toast } = useToast();


  const refreshData = useCallback(async () => {
    if (!user || !user.id) {
      console.warn('User not loaded or missing id:', user);
      return;
    }
    try {
      setIsLoading(true);
      const [transactionsData, summaryData, categoriesData, trendsData] = await Promise.all([
        transactionAPI.getTransactions(user.id, filters),
        analyticsAPI.getFinancialSummary(user.id, filters),
        analyticsAPI.getCategoryData(user.id, filters),
        analyticsAPI.getTrendData(user.id, filters),
      ]);
      setTransactions(transactionsData);
      setSummary(summaryData);
      setCategoryData(categoriesData);
      setTrendData(trendsData);
    } catch (error: unknown) {
      console.error('Failed to fetch data:', error);
      toast({
        title: "Failed to load data",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, filters, toast]);

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user, filters, refreshData]);

  const parseTransaction = async (text: string): Promise<ParsedTransaction> => {
    try {
      const parsed = await transactionAPI.parseTransaction(text);
      return parsed;
    } catch (error: unknown) {
      console.error('Failed to parse transaction:', error);
      let description = 'Unable to understand the transaction.';
      if (error && typeof error === 'object' && 'isAxiosError' in error && (error as AxiosError).isAxiosError) {
        const axiosErr = error as AxiosError<{ error?: string }>;
        description = axiosErr.response?.data?.error || description;
      }
      toast({
        title: "Parsing failed",
        description,
        variant: "destructive",
      });
      throw error;
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (!user?.id) throw new Error('User not signed in');
    try {
      const newTransaction = await transactionAPI.createTransaction(transaction, user.id);
      setTransactions(prev => [newTransaction, ...prev]);
      // Refresh analytics data
      const [summaryData, categoriesData, trendsData] = await Promise.all([
        analyticsAPI.getFinancialSummary(user.id, filters),
        analyticsAPI.getCategoryData(user.id, filters),
        analyticsAPI.getTrendData(user.id, filters),
      ]);
      setSummary(summaryData);
      setCategoryData(categoriesData);
      setTrendData(trendsData);
      toast({
        title: "Transaction added",
        description: `${transaction.type === 'income' ? 'Income' : 'Expense'} of $${transaction.amount} recorded.`,
      });
    } catch (error: unknown) {
      console.error('Failed to add transaction:', error);
      let description = 'Please try again.';
      if (error && typeof error === 'object' && 'isAxiosError' in error && (error as AxiosError).isAxiosError) {
        const axiosErr = error as AxiosError<{ error?: string }>;
        description = axiosErr.response?.data?.error || description;
      }
      toast({
        title: "Failed to add transaction",
        description,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    if (!user?.id) throw new Error('User not signed in');
    try {
      const updatedTransaction = await transactionAPI.updateTransaction(id, updates, user.id);
      setTransactions(prev => prev.map(t => t._id === id ? updatedTransaction : t));
      // Refresh analytics data
      refreshData();
      toast({
        title: "Transaction updated",
        description: "Your transaction has been successfully updated.",
      });
    } catch (error: unknown) {
      console.error('Failed to update transaction:', error);
      let description = 'Please try again.';
      if (error && typeof error === 'object' && 'isAxiosError' in error && (error as AxiosError).isAxiosError) {
        const axiosErr = error as AxiosError<{ error?: string }>;
        description = axiosErr.response?.data?.error || description;
      }
      toast({
        title: "Failed to update transaction",
        description,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user?.id) throw new Error('User not signed in');
    try {
      await transactionAPI.deleteTransaction(id, user.id);
      setTransactions(prev => prev.filter(t => t._id !== id));
      // Refresh analytics data
      refreshData();
      toast({
        title: "Transaction deleted",
        description: "Your transaction has been successfully deleted.",
      });
    } catch (error: unknown) {
      console.error('Failed to delete transaction:', error);
      let description = 'Please try again.';
      if (error && typeof error === 'object' && 'isAxiosError' in error && (error as AxiosError).isAxiosError) {
        const axiosErr = error as AxiosError<{ error?: string }>;
        description = axiosErr.response?.data?.error || description;
      }
      toast({
        title: "Failed to delete transaction",
        description,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value: TransactionContextType = {
    transactions,
    summary,
    categoryData,
    trendData,
    isLoading,
    filters,
    setFilters,
    parseTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refreshData,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};