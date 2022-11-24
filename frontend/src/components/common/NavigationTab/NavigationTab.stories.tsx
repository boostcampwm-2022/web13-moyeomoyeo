import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavigationTab from '.';

export default {
  title: 'Component/Layout/NavigationTab',
  component: NavigationTab,
} as ComponentMeta<typeof NavigationTab>;

const Template: ComponentStory<typeof NavigationTab> = (args) => <NavigationTab />;

export const _NavigationTab = Template.bind({});
