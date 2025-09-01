import React, { useRef, useEffect } from 'react';

import { FiArrowRight } from 'react-icons/fi';
import {
  animate,
  useMotionValue,
  motion,
} from 'framer-motion';

type BeamInputProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

export const BeamInput = ({ value, onChange, onSubmit, isLoading }: BeamInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: 'linear',
      duration: 5,
      repeat: Infinity,
    });
  }, [turn]);


  return (
    <form
      onSubmit={onSubmit}
      onClick={() => inputRef.current?.focus()}
      className="relative flex w-full max-w-xl items-center gap-2 rounded-full border border-lavenda/30 bg-jacarta/50 dark:bg-rose/50 py-1.5 pl-6 pr-1.5 shadow-glow"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="e.g., 'Bought coffee at Starbucks for $5.50'"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-jacarta placeholder-rose dark:placeholder:lavenda focus:outline-0 font-body"
        disabled={isLoading}
      />
      <button
        onClick={e => e.stopPropagation()}
        type="submit"
        disabled={!value.trim() || isLoading}
        className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-rose to-lavenda px-4 py-3 text-sm font-medium text-jacarta transition-transform active:scale-[0.985] shadow-glow"
      >
        <span>
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-jacarta"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ display: 'block' }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            'Parse'
          )}
        </span>
        <FiArrowRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
      </button>
      <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
        <motion.div
          className="mask-with-browser-support absolute -inset-[1px] rounded-full border border-transparent bg-origin-border"
        />
      </div>
    </form>
  );
};