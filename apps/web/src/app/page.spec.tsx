import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';

import * as stories from './page.stories';

describe('Home', () => {
  const { Home } = composeStories(stories);

  it('should render successfully', () => {
    const { baseElement } = render(<Home />);

    expect(baseElement).toBeTruthy();
  });
});
