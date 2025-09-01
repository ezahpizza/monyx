import { motion } from "framer-motion";
import { SignInButton } from '@clerk/clerk-react';
import { GlassNavbar } from "../shared";
import { FiArrowDownCircle } from "react-icons/fi";

export const NavBar = () => {
  return (
    <div className="absolute left-0 right-0 top-0 z-[90]">
      <GlassNavbar
        showSignIn
        signInButton={
          <SignInButton mode="modal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995, rotate: "3.5deg" }}
              className="h-12 flex items-center gap-2 rounded-md bg-lavenda px-4 py-2 font-medium text-rose transition-colors hover:bg-orchide hover:text-jacarta"
            >
              <span>Sign In</span>
            </motion.button>
          </SignInButton>
        }
      />
    </div>
  );
};

export const Copy = () => {
  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-7xl items-end justify-between p-4 md:p-8">
        <div>
          <h1 className="mb-6 max-w-4xl text-6xl font-black leading-[1.1] text-jacarta dark:text-orchide md:text-8xl">
            Take Control of Your <span className="text-plum dark:text-rose">Finances</span> with <span className="dark:text-rose text-plum">Monyx</span>
          </h1>
          <p className="max-w-xl text-jacarta dark:text-rose md:text-lg">
            Monyx is your intelligent finance tracker. Add transactions in natural language, analyze your spending, and unlock smart insights—all with a beautiful, secure, and modern experience.
          </p>
        </div>
        <FiArrowDownCircle className="hidden text-8xl text-lavenda md:block" />
      </div>
    </div>
  );
};


// ...existing code...

