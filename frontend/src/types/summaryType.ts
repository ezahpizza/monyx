import { FinancialSummary } from '@/types/APITypes';
import React from 'react';

export interface SummaryCardsProps {
  summary: FinancialSummary | null;
  isLoading?: boolean;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  type: 'income' | 'expense' | 'savings' | 'balance';
  isLoading?: boolean;
}