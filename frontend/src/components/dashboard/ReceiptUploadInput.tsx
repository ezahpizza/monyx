import React from 'react';
import { Button } from '../ui/button';

interface ReceiptUploadInputProps {
  file: File | null;
  setFile: (file: File | null) => void;
  disabled?: boolean;
}

export const ReceiptUploadInput: React.FC<ReceiptUploadInputProps> = ({ file, setFile, disabled }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div
      className="relative flex w-full max-w-xl items-center gap-2 rounded-full border border-lavenda/30 bg-jacarta/50 dark:bg-rose/50 py-1.5 pl-6 pr-1.5 shadow-glow mb-4"
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
      onClick={e => e.stopPropagation()}
      onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
      onDrop={e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          setFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <input
        id="receipt-upload-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <label htmlFor="receipt-upload-input" className="w-full cursor-pointer text-sm text-jacarta font-body flex items-center gap-2">
        {file ? (
          <span className="truncate">{file.name}</span>
        ) : (
          <span className="text-rose">Drag & drop or click to select an image</span>
        )}
      </label>
      <Button
        type="button"
        onClick={() => document.getElementById('receipt-upload-input')?.click()}
        disabled={disabled}
        className="shrink-0 px-4 py-2 rounded-full bg-gradient-to-br from-rose to-lavenda text-jacarta text-sm font-medium ml-2"
      >
        Browse
      </Button>
    </div>
  );
};
