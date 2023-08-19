import { render, screen } from '@testing-library/react';
import {ChatBox} from './ChatBox';
import '@testing-library/jest-dom/extend-expect'

describe('ChatBox', () => {
  it('should render', () => {
    render(<ChatBox />);
  });
});
