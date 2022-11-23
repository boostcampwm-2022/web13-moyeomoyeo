import { ComponentMeta, ComponentStory } from '@storybook/react';
import Footer from '.';

export default {
  title: 'Component/Layout/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer />;

export const _Footer = Template.bind({});
