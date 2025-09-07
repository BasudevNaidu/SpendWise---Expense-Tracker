import React from 'react';
import { Calculator, TrendingUp, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentMonth: string;
  onMonthChange: (month: string) => void;
  availableMonths: string[];
}

const Header: React.FC<HeaderProps> = ({ currentMonth, onMonthChange, availableMonths }) => {
  const formatMonthDisplay = (month: string) => {
    const [year, monthNum] = month.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-8 right-20 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-4 left-1/3 w-12 h-12 bg-pink-300/15 rounded-full blur-md animate-pulse delay-300"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-8 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:scale-110 transition-transform duration-300">
              <Calculator className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                SpendWise <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </h1>
              <p className="text-sm text-white/90 drop-shadow">व्यक्तिगत खर्च विश्लेषण • Personal Spending Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
              <TrendingUp className="h-5 w-5 text-white animate-pulse" />
              <select
                value={currentMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                className="px-4 py-2 bg-white/90 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-800 font-medium shadow-lg"
              >
                {availableMonths.map(month => (
                  <option key={month} value={month}>
                    {formatMonthDisplay(month)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;