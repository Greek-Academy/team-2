---
to: src/components/<%= name %>/<%= name %>.tsx
---

import { FC } from 'react';
import './<%= name %>.scss';

interface I<%= name %>Props {}

export const <%= name %>: FC<I<%= name %>Props> = () => {
  return (
    <div>
      <p></p>
    </div>
  )
}
