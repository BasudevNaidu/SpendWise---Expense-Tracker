import { Transaction, MonthlyData } from '../types';

const STORAGE_KEY = 'spending-tracker-data';

export const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored transactions:', error);
      return [];
    }
  }
  return [];
};

export const getMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthlyMap = new Map<string, MonthlyData>();
  
  transactions.forEach(transaction => {
    const month = transaction.month;
    
    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, {
        month,
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactions: [],
        categoryTotals: []
      });
    }
    
    const monthData = monthlyMap.get(month)!;
    monthData.transactions.push(transaction);
    
    if (transaction.type === 'income') {
      monthData.totalIncome += transaction.amount;
    } else {
      monthData.totalExpense += transaction.amount;
    }
  });
  
  // Calculate balances and category totals
  monthlyMap.forEach(monthData => {
    monthData.balance = monthData.totalIncome - monthData.totalExpense;
    
    // Calculate category totals for expenses only
    const categoryMap = new Map<string, number>();
    monthData.transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        categoryMap.set(
          transaction.category,
          (categoryMap.get(transaction.category) || 0) + transaction.amount
        );
      });
    
    monthData.categoryTotals = Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: monthData.totalExpense > 0 ? (amount / monthData.totalExpense) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  });
  
  return Array.from(monthlyMap.values()).sort((a, b) => b.month.localeCompare(a.month));
};