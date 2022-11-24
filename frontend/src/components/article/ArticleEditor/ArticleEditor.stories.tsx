import ArticleEditor from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/ArticleEditor',
  component: ArticleEditor,
} as ComponentMeta<typeof ArticleEditor>;

const Template: ComponentStory<typeof ArticleEditor> = () => <ArticleEditor />;

export const Default = Template.bind({});
