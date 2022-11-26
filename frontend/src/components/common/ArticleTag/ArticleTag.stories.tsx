import { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticleTag from '.';

export default {
  title: 'Component/ArticleTag',
  component: ArticleTag,
} as ComponentMeta<typeof ArticleTag>;

const Template: ComponentStory<typeof ArticleTag> = (args) => <ArticleTag {...args} />;

export const _ArticleTag = Template.bind({});
_ArticleTag.args = {
  color: 'lime',
  content: '제주',
};
