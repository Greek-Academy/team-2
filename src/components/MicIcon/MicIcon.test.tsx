import { render } from '@testing-library/react';
import {MicIcon} from './MicIcon';
import '@testing-library/jest-dom/extend-expect'
describe('MicIcon', () => {
  it('MicIcon visible TRUE case', () => {
    const { getByTestId } = render(<MicIcon visible={true} />)
    expect(getByTestId("backdrop")).toHaveStyle("visibility: visible;")
  });

  it('MicIcon visible FALSE case', () => {
    const { getByTestId } = render(<MicIcon visible={false} />)
    expect(getByTestId("backdrop")).toHaveStyle("visibility: hidden;")
  });
});