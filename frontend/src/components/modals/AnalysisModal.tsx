import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { SpendingHabitsAnalysis } from '@/types/APITypes';

type AnalysisModalProps = {
  isOpen: boolean;
  onClose: () => void;
  analysis: SpendingHabitsAnalysis | null;
  isLoading: boolean;
  error: string | null;
};

export const AnalysisModal = ({ isOpen, onClose, analysis, isLoading, error }: AnalysisModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-[#3b395d]/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={e => e.stopPropagation()}
            className="bg-gradient-to-br from-[#9085bc] to-[#cb6d9a] text-white p-6 rounded-lg w-full max-w-2xl shadow-xl cursor-default relative overflow-hidden z-[9999] pt-[700px] md:pt-[400px] "
          >
            <FiTrendingUp className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-[#9085bc] grid place-items-center mx-auto">
                <FiTrendingUp />
              </div>
              <h3 className="text-3xl font-bold text-center mb-6 text-jacarta">Spending Habits Analysis</h3>

              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-jacarta">Analyzing your spending habits...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-300 mb-4">{error}</p>
                  <p className="text-jacarta">Analysis unavailable, please try again later.</p>
                </div>
              )}

              {analysis && !isLoading && !error && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-jacarta mb-2">Patterns</h4>
                    <p className="text-white/90 leading-relaxed">{analysis.analysis.patterns}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-jacarta mb-2">Recurring Expenses</h4>
                    <p className="text-white/90 leading-relaxed">{analysis.analysis.recurringExpenses}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-jacarta mb-2">Spending Spikes</h4>
                    <p className="text-white/90 leading-relaxed">{analysis.analysis.spikes}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-jacarta mb-2">Suggestions</h4>
                    <p className="text-white/90 leading-relaxed">{analysis.analysis.suggestions}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  onClick={onClose}
                  className="bg-jacarta hover:bg-lavenda transition-colors duration-300ms text-lavenda hover:text-jacarta font-semibold px-6 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
