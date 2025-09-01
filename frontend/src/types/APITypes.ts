export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParsedTransaction {
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  confidence: number;
  date: string;
}

export interface FinancialSummary {
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryData {
  name: string;
  total: number;
}

export interface TrendData {
  date: string;
  total: number;
}

export interface SpendingHabitsAnalysis {
  analysis: {
    patterns: string;
    recurringExpenses: string;
    spikes: string;
    suggestions: string;
  };
}
