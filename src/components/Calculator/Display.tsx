import React from 'react';
import { Input } from '@/components/ui/input';

interface DisplayProps {
  value: string;
  isDarkMode: boolean;
}

export const Display: React.FC<DisplayProps> = ({ value, isDarkMode }) => (
  <div className="relative">
    <Input
      value={value}
      readOnly
      className={`
        text-right text-3xl font-digital h-16 
        ${isDarkMode ? 'bg-gray-800 text-emerald-400' : 'bg-white text-gray-900'}
        border-2 
        ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        rounded-xl shadow-inner
        transition-all duration-300
      `}
    />
    <div className={`
      absolute inset-0 pointer-events-none
      ${isDarkMode ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5' : 'bg-gradient-to-r from-blue-50/50 to-purple-50/50'}
      rounded-xl
    `}/>
  </div>
);