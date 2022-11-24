import { ComponentMeta, ComponentStory } from '@storybook/react';
import NoGroupMessage from './index';

export default {
  title: 'Component/NoGroupMessage',
  component: NoGroupMessage,
} as ComponentMeta<typeof NoGroupMessage>;

const Template: ComponentStory<typeof NoGroupMessage> = () => <NoGroupMessage />;

export const _NoGroupMessage = Template.bind({});
