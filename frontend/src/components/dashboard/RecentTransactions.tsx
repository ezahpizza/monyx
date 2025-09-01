
import { useTransactions } from '@/context/useTransactions';
import { useState } from 'react';
import HistModal from './HistModal';
import { Transaction } from '@/types/APITypes';
import { TransactionRow, TransactionRowSkeleton } from './TransactionRow';
import { PeriodToggle } from './PeriodToggle';

import { categoryColors } from './helpers';

export const RecentTransactions = () => {
  const { transactions, isLoading, deleteTransaction, updateTransaction, filters, setFilters } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<Transaction | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [period, setPeriod] = useState<'monthly' | 'weekly'>(filters.period || 'monthly');
  const recentTransactions = transactions.slice(0, 5);



  // Set filter for period (let backend handle date logic)
  const handlePeriodChange = (p: 'monthly' | 'weekly') => {
    setPeriod(p);
    setFilters({ ...filters, period: p, startDate: undefined, endDate: undefined });
  };

  // Edit handler
  const handleEdit = (txn: Transaction) => {
    setEditId(txn._id);
    setEditValue({ ...txn });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value } as Transaction);
  };

  const handleEditSave = async () => {
    if (!editId || !editValue) return;
    setEditLoading(true);
    try {
      await updateTransaction(editId, {
        description: editValue.description,
        amount: Number(editValue.amount),
        category: editValue.category,
        date: editValue.date,
        type: editValue.type,
      });
      setEditId(null);
      setEditValue(null);
    } catch (e) {
      // error handled in context
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditValue(null);
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    setDeleteLoading(id);
    try {
      await deleteTransaction(id);
    } catch (e) {
      // error handled in context
    } finally {
      setDeleteLoading(null);
    }
  };


  if (isLoading) {
    return (
      <div className="bg-orchide rounded-lg shadow-lg p-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-rose">Recent Transactions</h2>
            <p className="text-md text-jacarta">Your latest financial activity</p>
          </div>
          <PeriodToggle period={period} setPeriod={handlePeriodChange} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b-[1px] border-slate-200 text-jacarta text-md uppercase">
                <th className="p-3 text-left font-medium">Expense</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Date</th>
                <th className="p-3 text-left font-medium">Amount</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <TransactionRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }


  if (recentTransactions.length === 0) {
    return (
      <div className="bg-orchide rounded-lg shadow-lg p-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-rose">Recent Transactions</h2>
            <p className="text-sm text-jacarta">Your latest financial activity</p>
          </div>
          <PeriodToggle period={period} setPeriod={handlePeriodChange} />
        </div>
        <div className="text-center py-8 text-black">
          No transactions yet. Add your first transaction above!
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="bg-lavenda rounded-lg shadow-lg p-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-rose">Recent Transactions</h2>
            <p className="text-xl text-jacarta">Your latest financial activity</p>
          </div>
          <PeriodToggle period={period} setPeriod={handlePeriodChange} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] bg-rose shadow-lg rounded-lg">
            <thead>
              <tr className="border-b-[1px] border-jacarta text-jacarta text-lg uppercase">
                <th className="p-3 text-left font-medium">Expense</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Date</th>
                <th className="p-3 text-left font-medium">Amount</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction, i) => (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                  isEditing={editId === transaction._id}
                  editValue={editValue}
                  onEdit={() => handleEdit(transaction)}
                  onEditChange={handleEditChange}
                  onEditSave={handleEditSave}
                  onEditCancel={handleEditCancel}
                  editLoading={editLoading}
                  onDelete={() => handleDelete(transaction._id)}
                  deleteLoading={deleteLoading === transaction._id}
                  index={i}
                />
              ))}
              {/* Always render 5 rows for layout stability */}
              {recentTransactions.length < 5 &&
                Array.from({ length: 5 - recentTransactions.length }).map((_, i) => (
                  <TransactionRowSkeleton key={`skel-${i}`} />
                ))}
            </tbody>
          </table>
        </div>
        {transactions.length > 5 && (
          <div className="mt-4 text-center">
            <button
              className="px-4 py-2 rounded-lg bg-jacarta hover:bg-plum text-md text-rose font-medium transition-colors duration-300"
              onClick={() => setModalOpen(true)}
            >
              View all transactions
            </button>
          </div>
        )}
      </div>

      <HistModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        transactions={transactions}
        categoryColors={categoryColors}
      />
    </>
  );
};

//

