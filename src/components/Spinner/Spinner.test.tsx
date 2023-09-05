import { render } from '@testing-library/react';

import {Spinner} from './Spinner';
import '@testing-library/jest-dom/extend-expect'

describe('Spinner', () => {
  it('Spinner visible TRUE case', () => {
    const { getByTestId } = render(<Spinner visible={true} />)
    expect(getByTestId("backdrop")).toHaveStyle("visibility: visible")
  });

  it('Spinner visible FALSE case', () => {
    const { getByTestId } = render(<Spinner visible={false} />)
    expect(getByTestId("backdrop")).toHaveStyle("visibility: hidden")
  });
});
