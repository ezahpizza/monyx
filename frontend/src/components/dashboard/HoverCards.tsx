
import { TrendingUp, TrendingDown, PiggyBank, DollarSign } from 'lucide-react';
import React from 'react';
import { SummaryCardsProps } from '@/types/summaryType';

type HoverCardsProps = {
  summary: SummaryCardsProps['summary'];
  isLoading: boolean;
};

const summaryConfig = [
  {
    key: 'income',
    title: 'Total Income',
    subtitle: 'Total money received',
    icon: <TrendingUp className="h-6 w-6" />,
    type: 'income',
  },
  {
    key: 'expenses',
    title: 'Total Expenses',
    subtitle: 'Total money spent',
    icon: <TrendingDown className="h-6 w-6" />,
    type: 'expense',
  },
  {
    key: 'savings',
    title: 'Savings Goal',
    subtitle: 'Amount saved',
    icon: <PiggyBank className="h-6 w-6" />,
    type: 'savings',
  },
  {
    key: 'balance',
    title: 'Current Balance',
    subtitle: 'Income minus expenses',
    icon: <DollarSign className="h-6 w-6" />,
    type: 'balance',
  },
];

export const HoverCards = ({ summary, isLoading }: HoverCardsProps) => {
  const balance = summary ? (summary.income - summary.expenses) : 0;
  const getValue = (key: string) => {
    if (!summary) return 0;
    if (key === 'balance') return balance;
    return summary[key] || 0;
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <div className="p-4">
      <p className="text-2xl font-semibold mb-2 text-lavenda dark:text-orchide">Overview</p>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {summaryConfig.map((item) => (
          <HoverCard
            key={item.key}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            value={getValue(item.key)}
            type={item.type}
            isLoading={isLoading}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  );
};


type HoverCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  value: number;
  type: string;
  isLoading: boolean;
  formatCurrency: (amount: number) => string;
};

const getValueStyles = (type: string, value: number) => {
  switch (type) {
    case 'income':
      return 'text-success';
    case 'expense':
      return 'text-expense';
    case 'savings':
      return 'text-warning';
    default:
      return type === 'balance' && value < 0 ? 'text-expense' : 'text-success';
  }
};

const HoverCard = ({ title, subtitle, icon, value, type, isLoading, formatCurrency }:HoverCardProps) => {
  // Render both the large, clipped, top-right icon and a smaller inline icon above the title
  let InlineIcon = null;
  if (React.isValidElement(icon)) {

    InlineIcon = React.cloneElement(icon, {
      className:
        "mb-2 text-2xl text-orchide group-hover:text-rose transition-colors relative z-10 duration-300",
    });
  }
  return (
    <div className={`w-full p-4 rounded-xl relative overflow-hidden group bg-jacarta dark:bg-rose`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-lavenda translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 z-10" />

      <div className="relative z-40 flex flex-col items-start">
        {InlineIcon}
        <h3 className="font-medium text-lg text-rose dark:text-jacarta group-hover:text-jacarta duration-300">
          {title}
        </h3>
        <p className="text-orchide group-hover:text-rose duration-300">
          {subtitle}
        </p>
        <div className={`mt-2 text-2xl font-bold duration-300 ${getValueStyles(type, value)}`}>
          {isLoading ? (
            <div className="h-8 bg-muted rounded animate-pulse w-24" />
          ) : (
            formatCurrency(value)
          )}
        </div>
      </div>
    </div>
  );
};

