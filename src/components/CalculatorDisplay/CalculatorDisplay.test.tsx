import { render, screen } from '@testing-library/react';
import { CalculatorDisplay } from './CalculatorDisplay';
import '@testing-library/jest-dom/extend-expect'
describe('CalculatorDisplay', () => {
  it('should render', () => {
    render(<CalculatorDisplay value="222" />);
    expect(screen.getByText(/222/i)).toBeInTheDocument();
  });
});
