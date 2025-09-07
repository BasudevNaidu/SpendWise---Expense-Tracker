import React, { useState } from 'react';
import { Plus, IndianRupee, Sparkles, Zap } from 'lucide-react';
import { Transaction } from '../types';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/categories';

interface AddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    const transactionDate = new Date(date);
    const month = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
      month
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setIsOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-300/20 rounded-full blur-xl"></div>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg flex items-center gap-2 relative z-10">
          <Zap className="h-6 w-6 text-yellow-300 animate-pulse" />
          Add Transaction
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30 relative z-10"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">Transaction Type</label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as 'income' | 'expense');
                  setCategory('');
                }}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-800 font-medium shadow-lg"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-800 font-medium shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">Amount (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-800 font-medium shadow-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-800 font-medium shadow-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-800 font-medium shadow-lg"
              required
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 px-6 rounded-xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Add Transaction
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium border border-white/30"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTransaction;