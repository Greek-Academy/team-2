import { render, screen } from '@testing-library/react';
import {ChatBoxSubmit} from './ChatBoxSubmit';
import '@testing-library/jest-dom/extend-expect'

describe('ChatBoxSubmit', () => {
  it('should render', () => {
    render(<ChatBoxSubmit />);
  });
});
