
import { ParsedTransaction } from '@/types/APITypes';
import { FiAlertCircle } from 'react-icons/fi';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';

type TxnModalProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  parsed: ParsedTransaction | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  parsedDate?: string | null;
  setParsedDate?: (date: string) => void;
};

export const TxnModal = ({ isOpen, setIsOpen, parsed, onConfirm, onCancel, isLoading, parsedDate, setParsedDate }: TxnModalProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-700';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };
  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-[#3b395d]/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={e => e.stopPropagation()}
            className="bg-gradient-to-br from-[#9085bc] to-[#cb6d9a] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-[#9085bc] grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2 text-jacarta">Confirm Transaction</h3>
              {parsed && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium  text-jacarta">Confidence:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(parsed.confidence)}`}>
                      {getConfidenceText(parsed.confidence)} ({Math.round(parsed.confidence * 100)}%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-jacarta">Type:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${parsed.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {parsed.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-jacarta">Amount:</span>
                    <span className={`font-semibold ${parsed.type === 'income' ? 'text-green-300' : 'text-red-300'}`}>
                      ${parsed.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-jacarta">Category:</span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-plum">{parsed.category}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium text-jacarta">Description:</span>
                    <span className="text-sm text-right max-w-xs">{parsed.description}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-jacarta">Date:</span>
                    {setParsedDate ? (
                      <input
                        type="date"
                        className="rounded px-2 py-1 text-jacarta"
                        value={parsedDate ? parsedDate.slice(0, 10) : ''}
                        onChange={e => setParsedDate(e.target.value)}
                      />
                    ) : (
                      <span className="text-sm">{parsed.date ? parsed.date.slice(0, 10) : ''}</span>
                    )}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={onCancel}
                  className="bg-transparent hover:bg-white/10 transition-colors text-rose font-semibold w-full py-2 rounded-md"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="bg-jacarta hover:bg-lavenda transition-colors duration-300ms text-lavenda hover:text-jacarta font-semibold w-full py-2 rounded-md"
                  disabled={isLoading}
                >
                  Confirm & Save
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};