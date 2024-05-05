import Page from './page';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Pages/Home',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {};
