import React from 'react';
import { Button } from '@/components/ui/button';

interface KeypadProps {
  onNumberClick: (num: string) => void;
  onOperationClick: (op: string) => void;
  isDarkMode: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({ onNumberClick, onOperationClick, isDarkMode }) => {
  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  const getButtonStyle = (btn: string) => {
    const isOperation = ['÷', '×', '-', '+', '='].includes(btn);
    const baseStyle = `
      text-lg font-semibold rounded-xl
      transition-all duration-200 transform hover:scale-105
      active:scale-95 shadow-lg
    `;
    
    if (isOperation) {
      return `${baseStyle} ${
        isDarkMode 
          ? 'bg-blue-600 hover:bg-blue-500 text-white' 
          : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
      }`;
    }
    
    return `${baseStyle} ${
      isDarkMode
        ? 'bg-gray-700 hover:bg-gray-600 text-white'
        : 'bg-white hover:bg-gray-50 text-gray-900'
    }`;
  };

  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      {buttons.map((btn) => (
        <Button
          key={btn}
          onClick={() => {
            if (btn === '=') {
              onOperationClick(btn);
            } else if (['+', '-', '×', '÷'].includes(btn)) {
              onNumberClick(btn === '×' ? '*' : btn === '÷' ? '/' : btn);
            } else {
              onNumberClick(btn);
            }
          }}
          className={getButtonStyle(btn)}
        >
          {btn}
        </Button>
      ))}
    </div>
  );
};