import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Moon, Sun } from 'lucide-react';
import { Display } from './components/Calculator/Display';
import { Keypad } from './components/Calculator/Keypad';
import { advancedFunctions } from './components/Calculator/AdvancedFunctions';

const EngineeringCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState<Array<any>>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ value: number | string, unit: string } | null>(null);

  const handleNumberInput = (num: string) => {
    setDisplayValue(prev => 
      prev === '0' ? num : prev + num
    );
  };

  const handleOperation = (op: string) => {
    try {
      switch(op) {
        case '=':
          const evalResult = eval(displayValue);
          setDisplayValue(evalResult.toString());
          setHistory(prev => [...prev, {
            expression: displayValue,
            result: evalResult
          }]);
          break;
        case 'C':
          setDisplayValue('0');
          setSelectedFunction(null);
          setInputs({});
          break;
        case 'M+':
          setMemory(memory + parseFloat(displayValue));
          break;
        case 'M-':
          setMemory(memory - parseFloat(displayValue));
          break;
        case 'MR':
          setDisplayValue(memory.toString());
          break;
        case 'MC':
          setMemory(0);
          break;
      }
    } catch (error) {
      setDisplayValue('エラー');
    }
  };

  return (
    <div className={`
      min-h-screen p-4 sm:p-8 transition-colors duration-500
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}
    `}>
      <div className="container mx-auto max-w-4xl">
        <Card className={`
          ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/90'}
          backdrop-blur-lg shadow-2xl border-0
          rounded-2xl overflow-hidden
        `}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className={`
                text-2xl font-bold
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
                font-japanese
              `}>
                エンジニアリング計算機
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-full w-10 h-10"
              >
                {isDarkMode ? (
                  <Sun className="text-white" />
                ) : (
                  <Moon className="text-gray-900" />
                )}
              </Button>
            </div>

            <Tabs defaultValue="standard" className="space-y-4">
              <TabsList className="grid grid-cols-2 gap-4 p-1">
                <TabsTrigger 
                  value="standard"
                  className={`
                    rounded-lg py-2 px-4 text-sm font-medium transition-all
                    ${isDarkMode ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-white'}
                  `}
                >
                  標準計算
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced"
                  className={`
                    rounded-lg py-2 px-4 text-sm font-medium transition-all
                    ${isDarkMode ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-white'}
                  `}
                >
                  高度な計算
                </TabsTrigger>
              </TabsList>

              <TabsContent value="standard">
                <div className="space-y-6">
                  <Display value={displayValue} isDarkMode={isDarkMode} />
                  <Keypad 
                    onNumberClick={handleNumberInput}
                    onOperationClick={handleOperation}
                    isDarkMode={isDarkMode}
                  />
                  
                  <div className="grid grid-cols-4 gap-3">
                    {['MC', 'MR', 'M+', 'M-'].map((btn) => (
                      <Button
                        key={btn}
                        onClick={() => handleOperation(btn)}
                        className={`
                          font-semibold rounded-xl transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                            : 'bg-purple-100 hover:bg-purple-200 text-purple-800'}
                        `}
                      >
                        {btn}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Advanced tab content remains the same */}
            </Tabs>

            <div className={`
              mt-6 p-4 rounded-xl
              ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}
            `}>
              <h3 className={`
                text-lg font-semibold mb-2
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                計算履歴
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      p-3 rounded-lg transition-colors
                      ${isDarkMode ? 'bg-gray-600' : 'bg-white'}
                    `}
                  >
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {item.expression ? (
                        `${item.expression} = ${item.result}`
                      ) : (
                        `${item.function}: ${item.result}`
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngineeringCalculator;