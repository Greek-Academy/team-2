import { InputTypes } from '../../types';
import { useCalculator } from '../../hooks/useCalculator';
import { calculatorOperations, digitKeys } from '../../utils/helpers';
import { CalculatorDisplay } from '../CalculatorDisplay';
import { CalculatorKey } from '../CalculatorKey';
import './Calculator.scss';

export const Calculator = () => {
  const { state, handleClick } = useCalculator();
  const clearType = state.displayValue !== '0' ? InputTypes.clearDisplay : InputTypes.clearAll;

  return (
    <div className="calculator" data-testid="react-mac-calculator">
      <CalculatorDisplay value={state.displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey className="key-clear" onClick={() => handleClick(clearType)} keyValue={state.displayValue !== '0' ? 'C' : 'AC'} />
            <CalculatorKey className="key-sign" onClick={() => handleClick(InputTypes.toggleSign)} keyValue="±" />
            <CalculatorKey className="key-percent" onClick={() => handleClick(InputTypes.inputPercent)} keyValue="%" />
          </div>
          <div className="digit-keys">
            {digitKeys.map(digit => (
              <CalculatorKey key={`key-${digit}`} className={`key-${digit}`} onClick={() => handleClick(InputTypes.inputDigit, digit)} keyValue={digit} />
            ))}
            <CalculatorKey className="key-dot" onClick={() => handleClick(InputTypes.inputDot)} keyValue="●" disabled={state.displayValue.includes('.')} />
          </div>
        </div>
        <div className="operator-keys">
          {Object.entries(calculatorOperations).map(([key, value]) =>
            value.show && (
              <CalculatorKey key={`key-${value.name}`} className={`key-${value.name}`} onClick={() => handleClick(InputTypes.performOperation, key)} keyValue={value.symbol} />
            ))}
        </div>
      </div>
    </div>
  );
};
