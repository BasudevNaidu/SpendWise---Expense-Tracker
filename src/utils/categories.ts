export const EXPENSE_CATEGORIES = [
  'Grocery',
  'Entertainment', 
  'College/Education',
  'Transportation',
  'Healthcare',
  'Investment',
  'Shopping',
  'Food',
  'Miscellaneous'
];

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Due Return',
  'Other'
];

export const getCategoryColor = (category: string): string => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
  ];
  
  const index = category.length % colors.length;
  return colors[index];
};
