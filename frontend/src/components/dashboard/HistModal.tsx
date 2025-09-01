import { motion, AnimatePresence } from 'framer-motion';
import { formatDateDMY, cn } from '@/lib/utils';

type Transaction = {
  _id: string;
  description: string;
  category: string;
  date: string;
  type: string;
  amount: number;
};

type HistModalProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  transactions: Transaction[];
  categoryColors: Record<string, string>;
};

const HistModal = ({ isOpen, setIsOpen, transactions, categoryColors }: HistModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="bg-jacarta/20 backdrop-blur p-8 pt-32 fixed inset-0 z-[9999] grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: '12.5deg' }}
          animate={{ scale: 1, rotate: '0deg' }}
          exit={{ scale: 0, rotate: '0deg' }}
          onClick={e => e.stopPropagation()}
          className="bg-gradient-to-br from-[#9085bc] to-orchide text-rose p-6 rounded-lg w-full max-w-3xl shadow-xl cursor-default relative overflow-hidden"
        >
          <h3 className="text-2xl font-bold mb-2 text-jacarta">All Transactions</h3>
          <p className="text-sm mb-4 text-jacarta">Full list of your transactions</p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full min-w-[500px] bg-orchide text-jacarta shadow-lg rounded-lg">
              <thead>
                <tr className="border-b-[1px] border-jacarta text-jacarta text-md uppercase">
                  <th className="p-3 text-left font-medium">Expense</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, i) => (
                  <tr key={transaction._id} className={i % 2 ? 'bg-slate-100' : 'bg-orchide'}>
                    <td className="p-3 font-medium text-jacarta">{transaction.description}</td>
                    <td className="p-3">
                      <span className={cn(
                        'px-2 py-1 text-xs font-semibold rounded',
                        categoryColors[transaction.category] || categoryColors['Other']
                      )}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="p-3 text-jacarta">{formatDateDMY(transaction.date)}</td>
                    <td className={cn(
                      'p-3 font-semibold',
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded bg-lavenda hover:bg-plum text-jacarta hover:text-rose text-md font-semibold transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default HistModal;