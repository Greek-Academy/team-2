export type Digits = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
export type OperationKeys = '/' | '*' | '-' | '+' | '=' | 'Enter';

export interface CalculatorValues {
  name: 'divide' | 'multiply' | 'subtract' | 'add' | 'equals' | 'enter';
  symbol: '÷' | 'x' | '-' | '+' | '=';
  show: boolean;
  func: (prevValue: number, nextValue: number) => number;
}

export interface CalculatorState {
  value: number | null;
  displayValue: string;
  operator: string | number | null;
  waitingForOperand: boolean;
}

export type CalculatorOperations = Record<OperationKeys, CalculatorValues>;

export enum InputTypes {
  inputDigit = 'inputDigit',
  inputDot = 'inputDot',
  inputPercent = 'inputPercent',
  toggleSign = 'toggleSign',
  clearLastChar = 'clearLastChar',
  clearDisplay = 'clearDisplay',
  performOperation = 'performOperation',
  clearAll = 'clearAll',
}

export enum ChatBoxTypes {
  inputMessage =  'inputMessage',
  outputMessage = 'outputMessage',
}