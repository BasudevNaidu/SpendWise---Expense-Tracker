import React from 'react';
import { Trash2, ArrowUpCircle, ArrowDownCircle, IndianRupee, Calendar, Tag } from 'lucide-react';
import { Transaction } from '../types';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-2xl p-8 border border-emerald-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
        Recent Transactions
      </h3>
      
      {sortedTransactions.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
          <IndianRupee className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No transactions found for this month</p>
          <p className="text-sm">Start adding transactions to see them here!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {sortedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 ${
                transaction.type === 'income' 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 hover:from-green-200 hover:to-emerald-200' 
                  : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-200 hover:from-red-200 hover:to-pink-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-2xl shadow-lg ${
                  transaction.type === 'income' 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' 
                    : 'bg-gradient-to-br from-red-400 to-pink-500 text-white'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpCircle className="h-6 w-6" />
                  ) : (
                    <ArrowDownCircle className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{transaction.description}</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-lg">
                      <Tag className="h-3 w-3" />
                      {transaction.category}
                    </span>
                    <span className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-lg">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`font-bold text-xl ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 hover:bg-white/50 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;