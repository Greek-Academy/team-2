---
to: src/components/<%= name %>/<%= name %>.test.tsx
---
import { render, screen } from '@testing-library/react';
import {<%= name %>} from './<%= name %>';
import '@testing-library/jest-dom/extend-expect'

describe('<%= name %>', () => {
  it('should render', () => {
    render(<<%= name %> />);
  });
});
