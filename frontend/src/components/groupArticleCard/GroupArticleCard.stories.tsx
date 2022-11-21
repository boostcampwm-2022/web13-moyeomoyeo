import { ComponentMeta, ComponentStory } from '@storybook/react';
import GroupArticleCard from '.';
import { dummyArticle } from '@constants/dummy';

export default {
  title: 'Component/GroupArticleCard',
  component: GroupArticleCard,
} as ComponentMeta<typeof GroupArticleCard>;

const Template: ComponentStory<typeof GroupArticleCard> = (args) => <GroupArticleCard {...args} />;

export const NormalCard = Template.bind({});
NormalCard.args = { article: dummyArticle };

export const CardWithLongTitle = Template.bind({});
CardWithLongTitle.args = {
  article: { ...dummyArticle, title: '길어지는 제목입니다. 제목이 길어서 잘려요.' },
};
