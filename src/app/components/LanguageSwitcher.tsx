'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n/I18nProvider';
import { locales, localeNames, localeFlags, Locale } from '../../i18n/config';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-primary-800/50 hover:bg-primary-700/50 border border-primary-600/50 hover:border-accent-500/50 rounded-lg transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg">{localeFlags[locale]}</span>
        <span className="text-sm font-medium text-primary-100">
          {localeNames[locale]}
        </span>
        <motion.svg
          className="w-4 h-4 text-primary-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-48 bg-primary-800/95 backdrop-blur-md border border-primary-600/50 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <div className="py-1">
              {locales.map((loc) => (
                <motion.button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                    loc === locale
                      ? 'bg-accent-500/20 text-accent-300'
                      : 'text-primary-100 hover:bg-primary-700/50 hover:text-accent-200'
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="text-lg">{localeFlags[loc]}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{localeNames[loc]}</span>
                    <span className="text-xs opacity-70">{loc.toUpperCase()}</span>
                  </div>
                  {loc === locale && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-accent-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            <div className="px-4 py-2 border-t border-primary-600/50 bg-primary-900/50">
              <p className="text-xs text-primary-300/70 text-center">
                {t('languageSwitcher.helpText')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
