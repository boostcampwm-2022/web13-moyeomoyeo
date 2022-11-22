import { ComponentMeta, ComponentStory } from '@storybook/react';
import GroupArticleCard from '.';
import { dummyArticle } from '@constants/dummy';
import { ArticleStatus } from '@constants/article';

export default {
  title: 'Component/GroupArticleCard',
  component: GroupArticleCard,
} as ComponentMeta<typeof GroupArticleCard>;

const Template: ComponentStory<typeof GroupArticleCard> = (args) => <GroupArticleCard {...args} />;

export const NormalCard = Template.bind({});
NormalCard.args = { article: dummyArticle };

export const LongTitleCard = Template.bind({});
LongTitleCard.args = {
  article: { ...dummyArticle, title: '길어지는 제목입니다. 제목이 길어서 잘려요.' },
};

export const ClosedCard = Template.bind({});
ClosedCard.args = {
  article: { ...dummyArticle, status: ArticleStatus.SUCCEED },
};
