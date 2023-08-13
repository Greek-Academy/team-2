import { calculatorOperations } from '../utils/helpers';
import { CalculatorState, InputTypes, OperationKeys } from '../types';

export interface IInputDigit {
  type: InputTypes.inputDigit;
  payload: string | null;
}

export interface IInputDot {
  type: InputTypes.inputDot;
}

export interface IInputPercent {
  type: InputTypes.inputPercent;
}

export interface IToggleSign {
  type: InputTypes.toggleSign;
}

export interface IClearLastChar {
  type: InputTypes.clearLastChar;
}

export interface IClearDisplay {
  type: InputTypes.clearDisplay;
}

export interface IPerformOperation {
  type: InputTypes.performOperation;
  payload: number | string | null;
}

export interface IClearAll {
  type: InputTypes.clearAll;
}
export const initialState: CalculatorState = {
  value: null,
  displayValue: '0',
  operator: null,
  waitingForOperand: false,
};

export const calculatorReducer = (
  state: CalculatorState,
  action: IInputDigit | IInputDot | IInputPercent | IToggleSign | IClearLastChar | IClearDisplay | IPerformOperation | IClearAll,
) => {
  switch (action.type) {
    case InputTypes.inputDigit: {
      if (state.waitingForOperand) {
        return {
          ...state,
          displayValue: `${action.payload}`,
          waitingForOperand: false,
        };
      }

      return {
        ...state,
        displayValue: state.displayValue === '0' ? `${action.payload}` : `${state.displayValue}${action.payload}`,
      };
    }
    case InputTypes.inputDot: {
      if (state.waitingForOperand) {
        return {
          ...state,
          displayValue: '0.',
          waitingForOperand: false,
        };
      }

      return {
        ...state,
        displayValue: `${state.displayValue}.`,
        waitingForOperand: false,
      };
    }

    case InputTypes.inputPercent: {
      if (state.displayValue !== '0') {
        const fixedDigits: string = state.displayValue.replace(/^-?\d*\.?/, '');
        const newValue: number = parseFloat(state.displayValue) / 100;

        return {
          ...state,
          displayValue: `${newValue.toFixed(fixedDigits.length + 2)}`,
        };
      }

      return state;
    }

    case InputTypes.toggleSign: {
      const newValue = parseFloat(state.displayValue) * -1;

      return {
        ...state,
        displayValue: `${newValue}`,
      };
    }

    case InputTypes.clearLastChar:
      return {
        ...state,
        displayValue: state.displayValue.substring(0, state.displayValue.length - 1) || '0',
      };

    case InputTypes.clearDisplay:
      return {
        ...state,
        displayValue: '0',
      };

    case InputTypes.performOperation: {
      const inputValue = parseFloat(state.displayValue);

      if (state.value === null) {
        return {
          ...state,
          value: inputValue,
          operator: action.payload,
          waitingForOperand: true,
        };
      }

      if (state.operator) {
        const currentValue = state.value || 0;
        const newValue = calculatorOperations[state.operator as OperationKeys].func(currentValue, inputValue);

        return {
          value: newValue,
          displayValue: `${newValue}`,
          operator: action.payload,
          waitingForOperand: true,
        };
      }

      return {
        ...state,
        operator: action.payload,
        waitingForOperand: false,
      };
    }

    case InputTypes.clearAll:
      return initialState;

    default:
      return initialState;
  }
};
