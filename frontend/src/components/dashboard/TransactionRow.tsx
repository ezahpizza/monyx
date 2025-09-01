import { formatDateDMY, cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import { Transaction } from '@/types/APITypes';
import { categoryColors } from './helpers';

interface TransactionRowProps {
  transaction: Transaction;
  isEditing: boolean;
  editValue: Transaction | null;
  onEdit: () => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  editLoading: boolean;
  onDelete: () => void;
  deleteLoading: boolean;
  index: number;
}

export function TransactionRow({
  transaction,
  isEditing,
  editValue,
  onEdit,
  onEditChange,
  onEditSave,
  onEditCancel,
  editLoading,
  onDelete,
  deleteLoading,
  index,
}: TransactionRowProps) {
  if (isEditing && editValue) {
    return (
      <tr className={index % 2 ? 'bg-plum text-rose' : 'bg-rose text-jacarta'}>
        <td className="p-3 font-medium">
          <input
            className="border rounded px-2 py-1 w-full"
            name="description"
            value={editValue.description}
            onChange={onEditChange}
          />
        </td>
        <td className="p-3">
          <select
            className="border rounded px-2 py-1 w-full"
            name="category"
            value={editValue.category}
            onChange={onEditChange}
          >
            {Object.keys(categoryColors).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </td>
        <td className={index % 2 ? 'bg-plum text-rose p-3' : 'bg-rose text-jacarta p-3'}>
          <input
            type="date"
            className="border rounded px-2 py-1 w-full"
            name="date"
            value={editValue.date.slice(0,10)}
            onChange={onEditChange}
          />
        </td>
        <td className="p-3">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            name="amount"
            value={editValue.amount}
            onChange={onEditChange}
          />
        </td>
        <td className="p-3 flex gap-2">
          <button
            className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
            onClick={onEditSave}
            disabled={editLoading}
          >
            Save
          </button>
          <button
            className="px-2 py-1 rounded bg-gray-400 text-white hover:bg-gray-500"
            onClick={onEditCancel}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }
  return (
    <tr className={index % 2 ? 'bg-plum text-rose' : 'bg-rose text-jacarta'}>
      <td className="p-3 font-medium">{transaction.description}</td>
      <td className="p-3">
        <span className={cn(
          'px-2 py-1 text-xs font-semibold rounded',
          categoryColors[transaction.category] || categoryColors['Other']
        )}>
          {transaction.category}
        </span>
      </td>
      <td className={index % 2 ? 'bg-plum text-rose p-3' : 'bg-rose text-jacarta p-3'}>{formatDateDMY(transaction.date)}</td>
      <td className={cn(
        'p-3 font-semibold',
        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
      )}>
        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
      </td>
      <td className="p-3 flex gap-2">
        <button
          className="p-1 rounded hover:bg-gray-200"
          title="Edit"
          onClick={onEdit}
        >
          <Pencil size={18} />
        </button>
        <button
          className="p-1 rounded hover:bg-gray-200"
          title="Delete"
          onClick={onDelete}
          disabled={deleteLoading}
        >
          {deleteLoading ? (
            <span className="loader inline-block w-4 h-4 border-2 border-t-2 border-gray-400 rounded-full animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </td>
    </tr>
  );
}

export function TransactionRowSkeleton() {
  return (
    <tr>
      <td className="p-3">
        <div className="h-4 bg-muted rounded animate-pulse w-24" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-muted rounded animate-pulse w-16" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-muted rounded animate-pulse w-20" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-muted rounded animate-pulse w-12" />
      </td>
      <td className="p-3">
        <div className="h-4 bg-muted rounded animate-pulse w-10" />
      </td>
    </tr>
  );
}