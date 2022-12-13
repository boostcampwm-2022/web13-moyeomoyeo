import { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticleEditor from '.';

export default {
  title: 'Component/ArticleEditor',
  component: ArticleEditor,
} as ComponentMeta<typeof ArticleEditor>;

const Template: ComponentStory<typeof ArticleEditor> = () => <ArticleEditor />;

export const Default = Template.bind({});
