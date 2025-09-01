import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const StackedNotifications = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <Notification
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            dismiss={dismiss}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ id, title, description, variant, dismiss, index }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      dismiss(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, dismiss]);

  const isDestructive = variant === "destructive";
  const bottomPosition = 1 + index * 5; // 1rem base + 5rem per notification

  return (
    <motion.div
      layout
      initial={{ y: 15, scale: 0.9, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: -25, scale: 0.9, opacity: 0 }}
      transition={{ type: "spring" }}
      className={`p-4 w-80 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg text-white ${
        isDestructive ? "bg-red-600" : "bg-violet-600"
      } fixed z-50`}
      style={{ bottom: `${bottomPosition}rem`, right: "1rem" }}
    >
      <FiAlertCircle className="text-3xl absolute -top-4 -left-4 p-2 rounded-full bg-white text-violet-600 shadow" />
      <div className="flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="opacity-90">{description}</div>}
      </div>
      <button onClick={() => dismiss(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default StackedNotifications;