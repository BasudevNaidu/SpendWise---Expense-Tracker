export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  month: string; // YYYY-MM format
}

export interface CategoryTotal {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactions: Transaction[];
  categoryTotals: CategoryTotal[];
}