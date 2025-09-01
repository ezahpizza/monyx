
import React, { useState } from 'react';
import { useTransactions } from '@/context/useTransactions';
import { useAuth } from '@/context/AuthContext';
import { ParsedTransaction } from '@/types/APITypes';
import { TxnModal } from '../modals';
import { BeamInput } from './BeamInput';

export const TransactionEntry = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedTransaction, setParsedTransaction] = useState<ParsedTransaction | null>(null);
  const [parsedDate, setParsedDate] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { parseTransaction, addTransaction } = useTransactions();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    try {
      setIsLoading(true);
      const parsed = await parseTransaction(inputText);
      setParsedTransaction(parsed);
      setParsedDate(parsed.date || '');
      setShowConfirmDialog(true);
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!parsedTransaction || !user) return;
    try {
      setIsLoading(true);
      const normalizedType: 'income' | 'expense' =
        parsedTransaction && typeof parsedTransaction.type === 'string' && parsedTransaction.type.toLowerCase() === 'income' ? 'income' : 'expense';
      await addTransaction({
        amount: parsedTransaction.amount,
        category: parsedTransaction.category,
        description: parsedTransaction.description,
        type: normalizedType,
        date: parsedDate || new Date().toISOString(),
      });
      setInputText('');
      setParsedTransaction(null);
      setParsedDate(null);
      setShowConfirmDialog(false);
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setParsedTransaction(null);
    setParsedDate(null);
    setShowConfirmDialog(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-heading font-bold text-jacarta dark:text-rose flex items-center justify-center gap-2">
          <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-br from-lavenda to-orchide mr-2" />
          Smart Transaction Entry
        </h2>
        <p className="text-lavenda dark:text-orchide mt-2">Describe your transaction or drop a receipt, we'll handle the rest</p>
      </div>
      <BeamInput
        value={inputText}
        onChange={setInputText}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <TxnModal
        isOpen={showConfirmDialog}
        setIsOpen={setShowConfirmDialog}
        parsed={parsedTransaction}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isLoading={isLoading}
        parsedDate={parsedDate}
        setParsedDate={setParsedDate}
      />
    </div>
  );
};

