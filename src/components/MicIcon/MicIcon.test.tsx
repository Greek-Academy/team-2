import { render, screen } from '@testing-library/react';
import {MicIcon} from './MicIcon';
import '@testing-library/jest-dom/extend-expect'

describe('MicIcon', () => {
  it('should render', () => {
    render(<MicIcon />);
  });
});
