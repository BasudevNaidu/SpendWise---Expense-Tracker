import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import AddTransaction from './components/AddTransaction';
import Summary from './components/Summary';
import Charts from './components/Charts';
import TransactionList from './components/TransactionList';
import { Transaction, MonthlyData } from './types';
import { saveTransactions, loadTransactions, getMonthlyData } from './utils/localStorage';
import { generatePDF } from './utils/pdfExport';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Load transactions on component mount
  useEffect(() => {
    const savedTransactions = loadTransactions();
    setTransactions(savedTransactions);
  }, []);

  // Update monthly data when transactions change
  useEffect(() => {
    const data = getMonthlyData(transactions);
    setMonthlyData(data);
    
    // If current month doesn't exist in data, add empty month data
    if (!data.find(d => d.month === currentMonth)) {
      const emptyMonthData: MonthlyData = {
        month: currentMonth,
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactions: [],
        categoryTotals: []
      };
      setMonthlyData([emptyMonthData, ...data]);
    }
  }, [transactions, currentMonth]);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: uuidv4()
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleExportPDF = () => {
    const currentMonthData = monthlyData.find(d => d.month === currentMonth);
    if (currentMonthData) {
      generatePDF(currentMonthData);
    }
  };

  const availableMonths = monthlyData.map(d => d.month).sort().reverse();
  const currentMonthData = monthlyData.find(d => d.month === currentMonth) || {
    month: currentMonth,
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: [],
    categoryTotals: []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      <Header 
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        availableMonths={availableMonths}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Add Transaction */}
          <AddTransaction onAddTransaction={handleAddTransaction} />
          
          {/* Summary Cards */}
          <Summary 
            monthlyData={currentMonthData} 
            onExportPDF={handleExportPDF}
          />
          
          {/* Charts */}
          <Charts monthlyData={currentMonthData} />
          
          {/* Transaction List */}
          <TransactionList 
            transactions={currentMonthData.transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>
    </div>
  );
}

export default App;