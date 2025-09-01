
import { useEffect, useRef, useState, useCallback } from "react";
import { useAnimate, motion } from "framer-motion";
import { FiMenu, FiArrowUpRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { Logo } from "./logo";
import { DarkModeToggle } from "./DarkModeToggle";

import { useTheme } from "@/context/useTheme";

type GlassNavbarProps = {
  onSignInClick?: () => void;
  onSignOutClick?: () => void;
  showSignIn?: boolean;
  showSignOut?: boolean;
  showUserButton?: boolean;
  userButton?: React.ReactNode;
  signInButton?: React.ReactNode;
  signOutButton?: React.ReactNode;
};

const GlassNavbar = ({
  onSignInClick,
  onSignOutClick,
  showSignIn = false,
  showSignOut = false,
  showUserButton = false,
  userButton,
  signInButton,
  signOutButton,
}: GlassNavbarProps) => {
  const { mode, setMode } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const navRef = useRef(null);

  const handleMouseMove = useCallback(({ offsetX, offsetY, target }) => {
    const isNavElement = [...target.classList].includes("glass-nav");
    if (isNavElement) {
      setHovered(true);
      const top = offsetY + "px";
      const left = offsetX + "px";
      animate(scope.current, { top, left }, { duration: 0 });
    } else {
      setHovered(false);
    }
  }, [animate, scope]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.addEventListener("mousemove", handleMouseMove);
    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animate, scope, handleMouseMove]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: hovered ? "none" : "auto" }}
      className="glass-nav fixed left-0 right-0 top-0 z-[99] mx-auto max-w-6xl overflow-hidden border-[1px] border-white/10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur md:left-6 md:right-6 md:top-6 md:rounded-2xl"
    >
      <div className="glass-nav flex items-center justify-between px-3 py-3 md:px-5 md:py-5">
        <Cursor hovered={hovered} scope={scope} />
        <Logo />
        <div className="flex items-center gap-2 md:gap-4">
          <DarkModeToggle mode={mode} setMode={setMode} />
          <Buttons
            setMenuOpen={setMenuOpen}
            showSignIn={showSignIn}
            showSignOut={showSignOut}
            showUserButton={showUserButton}
            userButton={userButton}
            signInButton={signInButton}
            signOutButton={signOutButton}
            onSignInClick={onSignInClick}
            onSignOutClick={onSignOutClick}
          />
        </div>
      </div>
      <MobileMenu
        menuOpen={menuOpen}
        showSignIn={showSignIn}
        showSignOut={showSignOut}
        signInButton={signInButton}
        signOutButton={signOutButton}
        onSignInClick={onSignInClick}
        onSignOutClick={onSignOutClick}
      />
    </nav>
  );
};

export default GlassNavbar;

const Cursor = ({ hovered, scope }) => {
  return (
    <motion.span
      initial={false}
      animate={{
        opacity: hovered ? 1 : 0,
        transform: `scale(${
          hovered ? 1 : 0
        }) translateX(-50%) translateY(-50%)`,
      }}
      transition={{ duration: 0.15 }}
      ref={scope}
      className="pointer-events-none absolute z-0 grid h-[50px] w-[50px] origin-[0px_0px] place-content-center rounded-full bg-gradient-to-br from-indigo-600 from-40% to-indigo-400 text-2xl"
    >
      <FiArrowUpRight className="text-white" />
    </motion.span>
  );
};


const Buttons = ({
  setMenuOpen,
  showSignIn,
  showSignOut,
  showUserButton,
  userButton,
  signInButton,
  signOutButton,
  onSignInClick,
  onSignOutClick,
}) => (
  <div className="flex items-center gap-4">
    {showSignIn && (
      <div className="hidden md:block">
        {signInButton ? (
          signInButton
        ) : (
          <button
            className="group relative scale-100 overflow-hidden rounded-lg px-3 py-2 md:px-4 md:py-2 transition-transform hover:scale-105 active:scale-95"
            onClick={onSignInClick}
          >
            <span className="relative z-10 text-white/90 transition-colors group-hover:text-white">
              Sign in
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        )}
      </div>
    )}
    {showUserButton && userButton}
    <button
      onClick={() => setMenuOpen((pv) => !pv)}
      className="ml-2 block scale-100 text-2xl md:text-3xl text-white/90 transition-all hover:scale-105 hover:text-white active:scale-95 md:hidden"
    >
      <FiMenu />
    </button>
  </div>
);

// SignInButton removed, handled via props

const MobileMenu = ({
  menuOpen,
  showSignIn,
  showSignOut,
  signInButton,
  signOutButton,
  onSignInClick,
  onSignOutClick,
}) => {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      initial={false}
      animate={{ height: menuOpen ? height : "0px" }}
      className="block overflow-hidden md:hidden"
    >
      <div ref={ref} className="flex items-center justify-between px-3 pb-3">
        {showSignIn && (signInButton ? signInButton : (
          <button
            className="group relative scale-100 overflow-hidden rounded-lg px-3 py-2 transition-transform hover:scale-105 active:scale-95"
            onClick={onSignInClick}
          >
            <span className="relative z-10 text-white/90 transition-colors group-hover:text-white">Sign in</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
        {showSignOut && signOutButton}
      </div>
    </motion.div>
  );
};
