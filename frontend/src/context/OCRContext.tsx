import React, { createContext, useContext, useState, useCallback } from 'react';
import { ocrAPI } from '@/services/ocrAPI';
import { ParsedTransaction } from '@/types/APITypes';
import { OCRContextType } from '@/types/txnTypes';


const OCRContext = createContext<OCRContextType | undefined>(undefined);

export const OCRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [rawText, setRawText] = useState('');
  const [parsed, setParsed] = useState<ParsedTransaction | null>(null);

  const triggerOCR = useCallback(async (file: File) => {
    setLoading(true);
    setError(undefined);
    setRawText('');
    setParsed(null);
    try {
      const data = await ocrAPI.uploadReceipt(file);
      setRawText(data.rawText);
      setParsed(data.parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setLoading(false);
    setError(undefined);
    setRawText('');
    setParsed(null);
  }, []);

  return (
    <OCRContext.Provider value={{ file, setFile, loading, error, rawText, parsed, setParsed, triggerOCR, reset }}>
      {children}
    </OCRContext.Provider>
  );
};

export const useOCR = () => {
  const ctx = useContext(OCRContext);
  if (!ctx) throw new Error('useOCR must be used within an OCRProvider');
  return ctx;
};
