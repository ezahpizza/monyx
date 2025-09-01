import React from "react";
import { motion } from "framer-motion";

type WatermarkProps = { text: string; reverse: boolean };
const Watermark = ({ reverse, text }: WatermarkProps) => (
  <div className="flex -translate-y-12 select-none overflow-hidden bg-rose dark:bg-jacarta">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit font-bgText tracking-tighter whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-lavenda opacity-15">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit tracking-tighter font-bgText whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-lavenda opacity-15">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

type TranslateWrapperProps = { children: React.ReactNode; reverse: boolean };
const TranslateWrapper = ({ children, reverse }: TranslateWrapperProps) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};

export const WatermarkBackground = () => {
  return (
    <>
      <Watermark text="Track Smarter" reverse={false} />
      <Watermark text="Spend Wiser" reverse={true} />
      <Watermark text="Monyx" reverse={false} />
      <Watermark text="Financial Freedom" reverse={true} />
      <Watermark text="Track Smarter" reverse={false} />
      <Watermark text="Spend Wiser" reverse={true} />
      <Watermark text="Monyx" reverse={false} />
      <Watermark text="Financial Freedom" reverse={true} />
    </>
  );
};