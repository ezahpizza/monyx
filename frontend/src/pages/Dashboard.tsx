import React from 'react';
import { GlassNavbar, WatermarkBackground } from '@/components/shared';
import { UserButton, SignOutButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { TransactionEntry, Charts, HoverCards, RecentTransactions, ReceiptUploadInput } from '@/components/dashboard';
import { UploadReceiptModal, AnalysisModal } from '@/components/modals';
import { OCRProvider, useOCR } from '@/context/OCRContext';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/context/useTransactions';
import { analyticsAPI } from '@/services/analyticsAPI';
import { SpendingHabitsAnalysis } from '@/types/APITypes';


const DashboardContent = () => {
  const { summary, categoryData, trendData, isLoading, addTransaction, refreshData } = useTransactions();
  const { user, loading } = useAuth();
  const {
    file: receiptFile,
    setFile: setReceiptFile,
    loading: ocrLoading,
    error: ocrError,
    rawText: ocrRawText,
    parsed: ocrParsed,
    setParsed: setOcrParsed,
    triggerOCR,
    reset: resetOCR
  } = useOCR();
  const [receiptModalOpen, setReceiptModalOpen] = React.useState(false);
  const [analysisModalOpen, setAnalysisModalOpen] = React.useState(false);
  const [analysisLoading, setAnalysisLoading] = React.useState(false);
  const [analysisError, setAnalysisError] = React.useState<string | null>(null);
  const [analysisData, setAnalysisData] = React.useState<SpendingHabitsAnalysis | null>(null);

  React.useEffect(() => {
    if (receiptFile) {
      (async () => {
        await triggerOCR(receiptFile);
        setReceiptModalOpen(true);
      })();
    }
    // eslint-disable-next-line
  }, [receiptFile]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleReceiptConfirm = async () => {
    if (!user || !ocrParsed) return;
    const normalizedType: 'income' | 'expense' =
      ocrParsed && typeof ocrParsed.type === 'string' && ocrParsed.type.toLowerCase() === 'income' ? 'income' : 'expense';
    const payload = {
      amount: ocrParsed.amount,
      category: ocrParsed.category,
      description: ocrParsed.description,
      type: normalizedType,
      date: ocrParsed.date,
    };
    await addTransaction(payload);
    setReceiptModalOpen(false);
    resetOCR();
    refreshData();
  };

  const handleReceiptCancel = () => {
    setReceiptModalOpen(false);
    resetOCR();
  };

  const handleAnalysis = async () => {
    if (!user?.id) return;
    setAnalysisLoading(true);
    setAnalysisError(null);
    setAnalysisData(null);
    setAnalysisModalOpen(true);
    try {
      const data = await analyticsAPI.getSpendingHabits(user.id);
      setAnalysisData(data);
    } catch (error) {
      setAnalysisError('Failed to fetch analysis. Please try again.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleAnalysisClose = () => {
    setAnalysisModalOpen(false);
    setAnalysisError(null);
    setAnalysisData(null);
  };

    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Fullscreen background */}
        <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <WatermarkBackground />
        </div>
        <div className="relative z-10 flex flex-col">
          <GlassNavbar
            showSignOut
            showUserButton
            signOutButton={
              <SignOutButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.995, rotate: '3.5deg' }}
                  className="h-12 flex items-center gap-2 rounded-md bg-lavenda px-4 py-2 font-medium text-rose transition-colors hover:bg-orchide hover:text-jacarta"
                >
                  <span>Sign Out</span>
                </motion.button>
              </SignOutButton>
            }
            userButton={<UserButton />}
          />
          <main className="container mx-auto px-4 py-8 mt-24 flex flex-col">
            <div className="space-y-8 flex flex-col">
              <div className="flex flex-col space-y-2">
                <h2 className="text-4xl font-heading font-bold text-jacarta dark:text-rose">
                  Dashboard
                </h2>
                <p className="text-black text-2xl dark:text-orchide">
                  Welcome back! Here's your financial overview.
                </p>
              </div>
              <HoverCards summary={summary} isLoading={isLoading} />
              <div className="flex flex-col md:flex-row gap-4 items-center w-full">
                <div className="flex-1 w-full">
                  <TransactionEntry />
                  <ReceiptUploadInput file={receiptFile} setFile={setReceiptFile} />
                </div>
              </div>
              <UploadReceiptModal
                open={receiptModalOpen}
                onClose={handleReceiptCancel}
                onCancel={handleReceiptCancel}
                onConfirm={handleReceiptConfirm}
                rawText={ocrRawText}
                parsed={ocrParsed}
                loading={ocrLoading}
                error={ocrError}
                setParsed={setOcrParsed}
              />
              <Charts
                categoryData={categoryData}
                trendData={trendData}
                isLoading={isLoading}
              />
              <RecentTransactions />
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.995 }}
                  onClick={handleAnalysis}
                  className="bg-gradient-to-r from-[#9085bc] to-[#cb6d9a] hover:from-[#7a6fa3] hover:to-[#b55d8a] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
                  disabled={analysisLoading}
                >
                  {analysisLoading ? 'Analyzing...' : 'Analyze Spending Habits'}
                </motion.button>
              </div>
              <AnalysisModal
                isOpen={analysisModalOpen}
                onClose={handleAnalysisClose}
                analysis={analysisData}
                isLoading={analysisLoading}
                error={analysisError}
              />
            </div>
          </main>
        </div>
      </div>
    );
};

const Dashboard = () => (
  <OCRProvider>
    <DashboardContent />
  </OCRProvider>
);

export default Dashboard;