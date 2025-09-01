import { motion } from "framer-motion";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";


export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-jacarta dark:text-rose transition-colors">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Why <span className="text-orchide">Monyx</span>?
          <span className="block text-lavenda text-2xl font-medium mt-2">Your intelligent, all-in-one finance tracker</span>
        </h2>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4 bg-jacarta dark:bg-rose transition-colors">
          <CardTitle>Google OAuth Security</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-primary p-4 transition-transform duration-&lsqb;250ms&rsqb; group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold dark:text-jacarta text-rose">
              Sign in securely with Google. Your data is private, protected, and accessible anywhere.
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8 bg-jacarta dark:bg-rose transition-colors">
          <CardTitle>AI-Powered Smart Entry</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-primary p-4 transition-transform duration-&lsqb;250ms&rsqb; group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold dark:text-jacarta text-rose">
              Add transactions in plain English. Monyx parses amount, category, and description for you.
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8 bg-jacarta dark:bg-rose transition-colors">
          <CardTitle>Insightful Analytics</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-primary p-4 transition-transform duration-&lsqb;250ms&rsqb; group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold dark:text-jacarta text-rose">
              Visualize your spending with beautiful charts, summaries, and trends. Filter and search with ease.
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4 bg-jacarta dark:bg-rose transition-colors">
          <CardTitle>Modern, Responsive UI</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-primary p-4 transition-transform duration-&lsqb;250ms&rsqb; group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold dark:text-jacarta text-rose">
              Enjoy a stunning, mobile-first experience with dark mode, smooth animations, and custom design.
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-card p-8 ${className}`}
    >
      
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold text-rose dark:text-jacarta">{children}</h3>
  );
};