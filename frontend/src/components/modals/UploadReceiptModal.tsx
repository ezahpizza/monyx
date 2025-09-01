
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParsedTransaction } from '@/types/APITypes';

interface UploadReceiptModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (parsed: ParsedTransaction) => void;
}

export const UploadReceiptModal: React.FC<UploadReceiptModalProps & {
  rawText: string;
  parsed: ParsedTransaction | null;
  loading: boolean;
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
  setParsed: (parsed: ParsedTransaction) => void;
}> = ({ open, onConfirm, onCancel, rawText, parsed, loading, error, setParsed }) => {

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="bg-[#3b395d]/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={e => e.stopPropagation()}
            className="bg-gradient-to-br from-[#9085bc] to-[#cb6d9a] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <h3 className="text-3xl font-bold text-center mb-4">Receipt OCR Results</h3>
            {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
            {loading && (
              <div className="w-full flex justify-center items-center my-6">
                <span className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full inline-block"></span>
                <span className="ml-3">Processing image...</span>
              </div>
            )}
            {rawText && (
              <div className="mt-4">
                <div className="font-semibold">Extracted Text:</div>
                <div className="bg-gray-100 p-2 rounded text-sm text-jacarta">{rawText}</div>
              </div>
            )}
            {parsed && (
              <div className="mt-4">
                <div className="font-semibold mb-2">Parsed Transaction</div>
                <div className="space-y-1">
                  <div>Amount: <b>{parsed.amount}</b></div>
                  <div>Category: <b>{parsed.category}</b></div>
                  <div>Description: <b>{parsed.description}</b></div>
                  <div>Date: <input type="date" value={parsed.date.slice(0,10)} onChange={e => setParsed({ ...parsed, date: e.target.value })} className="rounded px-2 py-1 text-jacarta" /></div>
                  <div>Confidence: <b>{(parsed.confidence * 100).toFixed(0)}%</b></div>
                </div>
              </div>
            )}
            <div className="flex gap-2 mt-6">
              <button
                onClick={onCancel}
                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-white hover:opacity-90 transition-opacity text-[#9085bc] font-semibold w-full py-2 rounded"
                disabled={!parsed || loading}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
