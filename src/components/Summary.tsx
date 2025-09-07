import React from 'react';
import { TrendingUp, TrendingDown, Wallet, FileText, IndianRupee, Sparkles, Zap, Star } from 'lucide-react';
import { MonthlyData } from '../types';

interface SummaryProps {
  monthlyData: MonthlyData;
  onExportPDF: () => void;
}

const Summary: React.FC<SummaryProps> = ({ monthlyData, onExportPDF }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/20">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>
        <div className="flex items-center justify-between">
          <div className="relative z-10">
            <p className="text-emerald-100 text-sm font-medium flex items-center gap-1">
              <Star className="h-4 w-4" />
              Total Income
            </p>
            <p className="text-3xl font-bold drop-shadow-lg">{formatCurrency(monthlyData.totalIncome)}</p>
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            <TrendingUp className="h-10 w-10 text-white animate-pulse" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-400 via-red-500 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/20">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange-300/20 rounded-full blur-lg"></div>
        <div className="flex items-center justify-between">
          <div className="relative z-10">
            <p className="text-rose-100 text-sm font-medium flex items-center gap-1">
              <Zap className="h-4 w-4" />
              Total Expenses
            </p>
            <p className="text-3xl font-bold drop-shadow-lg">{formatCurrency(monthlyData.totalExpense)}</p>
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            <TrendingDown className="h-10 w-10 text-white animate-pulse" />
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${monthlyData.balance >= 0 ? 'from-blue-400 via-indigo-500 to-purple-600' : 'from-orange-400 via-red-500 to-pink-600'} rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/20`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>
        <div className="flex items-center justify-between">
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-medium flex items-center gap-1">
              <IndianRupee className="h-4 w-4" />
              Balance
            </p>
            <p className="text-3xl font-bold drop-shadow-lg">{formatCurrency(monthlyData.balance)}</p>
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            <Wallet className="h-10 w-10 text-white animate-pulse" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/20">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-300/20 rounded-full blur-lg"></div>
        <div className="flex items-center justify-between">
          <div className="relative z-10">
            <p className="text-purple-100 text-sm font-medium flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              {formatMonth(monthlyData.month)}
            </p>
            <button
              onClick={onExportPDF}
              className="mt-3 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition-all duration-300 text-sm font-semibold hover:scale-105 backdrop-blur-sm border border-white/30"
            >
              Export PDF
            </button>
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            <FileText className="h-10 w-10 text-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;