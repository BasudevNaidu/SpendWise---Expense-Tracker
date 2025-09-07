import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { MonthlyData } from '../types';
import { getCategoryColor } from '../utils/categories';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsProps {
  monthlyData: MonthlyData;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

const Charts: React.FC<ChartsProps> = ({ monthlyData }) => {
  const pieData = {
    labels: monthlyData.categoryTotals.map(item => item.category),
    datasets: [
      {
        data: monthlyData.categoryTotals.map(item => item.amount),
        backgroundColor: [
          '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
          '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ],
        borderWidth: 4,
        borderColor: '#ffffff',
        hoverBorderWidth: 6,
        hoverOffset: 15,
      },
    ],
  };

  const barData = {
    labels: monthlyData.categoryTotals.map(item => item.category),
    datasets: [
      {
        label: 'Amount Spent',
        data: monthlyData.categoryTotals.map(item => item.amount),
        backgroundColor: [
          'rgba(255, 107, 107, 0.8)', 'rgba(78, 205, 196, 0.8)', 'rgba(69, 183, 209, 0.8)',
          'rgba(150, 206, 180, 0.8)', 'rgba(255, 234, 167, 0.8)', 'rgba(221, 160, 221, 0.8)',
          'rgba(152, 216, 200, 0.8)', 'rgba(247, 220, 111, 0.8)', 'rgba(187, 143, 206, 0.8)',
          'rgba(133, 193, 233, 0.8)'
        ],
        borderColor: [
          '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
          '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ],
        borderWidth: 3,
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#374151'
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const item = monthlyData.categoryTotals[context.dataIndex];
            return `${item.category}: ₹${item.amount.toFixed(2)} (${item.percentage.toFixed(1)}%)`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            weight: 'bold'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          callback: (value: any) => `₹${value}`,
          color: '#6B7280',
          font: {
            weight: 'bold'
          }
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-purple-100 hover:shadow-3xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
          Expense Breakdown
        </h3>
        {monthlyData.categoryTotals.length > 0 ? (
          <div className="h-80">
            <Pie data={pieData} options={pieOptions} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            No expense data available
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 border border-blue-100 hover:shadow-3xl transition-all duration-300">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
          Category Spending
        </h3>
        {monthlyData.categoryTotals.length > 0 ? (
          <div className="h-80">
            <Bar data={barData} options={barOptions} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            No expense data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;