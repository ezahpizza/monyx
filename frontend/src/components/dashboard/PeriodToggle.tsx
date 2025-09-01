import { motion } from 'framer-motion';

export function PeriodToggle({ period, setPeriod }: { period: 'monthly' | 'weekly'; setPeriod: (p: 'monthly' | 'weekly') => void }) {
  return (
    <button
      onClick={() => setPeriod(period === 'monthly' ? 'weekly' : 'monthly')}
      className={`p-2 w-20 rounded-full flex shadow-lg relative bg-gradient-to-b transition-colors duration-300 ${
        period === 'monthly'
          ? 'justify-start from-indigo-600 to-indigo-400'
          : 'justify-end from-blue-500 to-sky-300'
      }`}
      aria-label="Toggle period"
    >
      <motion.div
        layout
        transition={{ duration: 0.5, type: 'spring' }}
        className="h-8 w-8 rounded-full overflow-hidden shadow-lg relative flex items-center justify-center bg-slate-100"
      >
        <span className="text-lg font-bold text-jacarta">{period === 'monthly' ? 'M' : 'W'}</span>
      </motion.div>
    </button>
  );
}