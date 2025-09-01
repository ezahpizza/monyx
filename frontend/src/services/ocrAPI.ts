import api from './baseApi';
import { ParsedTransaction } from '../types/APITypes';

export const ocrAPI = {
  uploadReceipt: async (file: File): Promise<{ rawText: string; parsed: ParsedTransaction }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/transactions/ocr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
