import { render } from '@testing-library/react';
import {MicIcon} from './MicIcon';
import '@testing-library/jest-dom/extend-expect'

describe('MicIcon', () => {
  it('[Test2] should render', () => {
    render(<MicIcon visible={true} />);
  });
});