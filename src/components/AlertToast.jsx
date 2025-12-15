// src/components/AlertToast.jsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';

/**
 * Props:
 *  - show: boolean (controls visibility)
 *  - message: string (text to display)
 *  - type?: 'success' | 'error' | 'info' (default: 'info')
 *  - duration?: number (ms before auto-close, default: 4000; 0 = no auto close)
 *  - onClose?: () => void (called when alert auto-closes or user clicks X)
 */
const AlertToast = ({
  show,
  message,
  type = 'info',
  duration = 4000,
  onClose,
}) => {
  // REMOVED the useEffect - auto-closing is now handled in the context

  const stylesByType = {
    success: {
      border: 'border-emerald-500',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      icon: <FaCheckCircle className="w-4 h-4" />,
      title: 'Success',
    },
    error: {
      border: 'border-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      icon: <FaExclamationTriangle className="w-4 h-4" />,
      title: 'Error',
    },
    info: {
      border: 'border-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      icon: <FaInfoCircle className="w-4 h-4" />,
      title: 'Notice',
    },
  };

  const style = stylesByType[type] || stylesByType.info;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="alert-toast"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed top-4 inset-x-0 z-[60] flex justify-center pointer-events-none"
        >
          <div
            className={`
              pointer-events-auto
              max-w-sm w-[90%] sm:w-auto
              bg-white/95 backdrop-blur-md
              shadow-xl shadow-black/20
              rounded-xl
              border-l-4
              px-4 py-3
              flex items-start gap-3
              ${style.border}
            `}
          >
            <div
              className={`mt-0.5 p-1.5 rounded-full ${style.iconBg} ${style.iconColor}`}
            >
              {style.icon}
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-900 mb-0.5">
                {style.title}
              </p>
              <p className="text-xs text-gray-700 whitespace-pre-wrap">
                {message}
              </p>
            </div>

            <button
              onClick={onClose}
              className="ml-2 mt-0.5 p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Close alert"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertToast;