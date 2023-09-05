import { render } from '@testing-library/react';
import { ChatBox } from './ChatBox';
import '@testing-library/jest-dom/extend-expect'

describe('ChatBox', () => {
  Element.prototype.scrollTo = () => {}
  it('[Test1] should render', () => {
    render(<ChatBox />);
  });
});