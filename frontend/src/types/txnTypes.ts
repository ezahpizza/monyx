import { Transaction, ParsedTransaction, FinancialSummary, CategoryData, TrendData } from '@/types/APITypes';
import {  ReactNode } from 'react';

export interface TransactionFilters {
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  period?: 'weekly' | 'monthly';
}

export interface TransactionContextType {
  transactions: Transaction[];
  summary: FinancialSummary | null;
  categoryData: CategoryData[];
  trendData: TrendData[];
  isLoading: boolean;
  filters: TransactionFilters;
  setFilters: (filters: TransactionFilters) => void;
  parseTransaction: (text: string) => Promise<ParsedTransaction>;
  addTransaction: (transaction: Omit<Transaction, '_id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

export interface TransactionProviderProps {
  children: ReactNode;
}

export interface OCRContextType {
  file: File | null;
  setFile: (file: File | null) => void;
  loading: boolean;
  error?: string;
  rawText: string;
  parsed: ParsedTransaction | null;
  setParsed: (parsed: ParsedTransaction | null) => void;
  triggerOCR: (file: File) => Promise<void>;
  reset: () => void;
}


