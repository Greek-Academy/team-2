import {useCallback, useEffect, useReducer} from 'react';
import {calculatorOperations} from '../utils';
import {calculatorReducer, initialState} from '../reducer';
import {InputTypes} from '../types';

export const useCalculator = () => {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    const handleClick = (type: InputTypes, payload?: string) => {
        dispatch({type, payload: payload || null});
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        e.preventDefault();

        switch (e.key) {
            case ',':
            case '.':
                dispatch({type: InputTypes.inputDot});
                break;
            case '%':
                dispatch({type: InputTypes.inputPercent});
                break;
            case 'Backspace':
                dispatch({type: InputTypes.clearLastChar});
                break;
            case 'Clear': {
                // Wrapped this case with curly braces
                const clearType = state.displayValue !== '0' ? InputTypes.clearDisplay : InputTypes.clearAll;
                dispatch({type: clearType});
                break;
            }
            default:
                if (/\d/.test(e.key)) {
                    dispatch({type: InputTypes.inputDigit, payload: e.key});
                } else if (e.key in calculatorOperations) {
                    dispatch({type: InputTypes.performOperation, payload: e.key});
                }
                break;
        }
    }, [state.displayValue]);

    useEffect(() => {
        // document.addEventListener('keydown', handleKeyDown);
        // return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return {state, handleClick};
};
