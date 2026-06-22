import { HelloWorld as Component } from './hello-world';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HelloWorld: Story = {};
