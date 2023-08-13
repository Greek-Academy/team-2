import { Digits, CalculatorOperations } from '../types';

export const digitKeys: Digits[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

export const calculatorOperations: CalculatorOperations = {
  '/': {
    name: 'divide',
    symbol: '÷',
    show: true,
    func: (prevValue: number, nextValue: number) => prevValue / nextValue,
  },
  '*': {
    name: 'multiply',
    symbol: 'x',
    show: true,
    func: (prevValue: number, nextValue: number) => prevValue * nextValue,
  },
  '-': {
    name: 'subtract',
    symbol: '-',
    show: true,
    func: (prevValue: number, nextValue: number) => prevValue - nextValue,
  },
  '+': {
    name: 'add',
    symbol: '+',
    show: true,
    func: (prevValue: number, nextValue: number) => prevValue + nextValue,
  },
  '=': {
    name: 'equals',
    symbol: '=',
    show: true,
    func: (_prevValue: number, nextValue: number) => nextValue,
  },
  'Enter': {
    name: 'enter',
    symbol: '=',
    show: false,
    func: (_prevValue: number, nextValue: number) => nextValue,
  },
};

export const getFormattedValue = (value: string): string => {
  const formattedNumber = parseFloat(value).toLocaleString('en-US', {
    useGrouping: true,
    maximumFractionDigits: 6,
  });

  const match = value.match(/\.\d*?(0*)$/);

  const suffix = match && /[1-9]/.test(match[0]) ? match[1] : match?.[0] || '';
  const formattedValue = formattedNumber + suffix;

  return formattedValue.length >= 14 ? parseFloat(value).toExponential() : formattedValue;
};

