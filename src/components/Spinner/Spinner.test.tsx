import { render, screen } from '@testing-library/react';
import {Spinner} from './Spinner';
import '@testing-library/jest-dom/extend-expect'

describe('Spinner', () => {
  it('should render', () => {
    render(<Spinner />);
  });
});
