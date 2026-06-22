import Component from './page';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {};
