import CommentInput from '.';
import PageLayout from '@components/common/PageLayout';
import Header from '@components/common/Header';
import RootTitle from '@components/common/Header/RootTitle';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/CommentInput',
  component: CommentInput,
} as ComponentMeta<typeof CommentInput>;

const Template: ComponentStory<typeof CommentInput> = (args) => <CommentInput />;
const PageTemplate: ComponentStory<typeof CommentInput> = (args) => (
  <PageLayout
    header={<Header leftNode={<RootTitle title="페이지 대제목" subTitle="페이지 소제목" />} />}
    footer={<CommentInput />}
  ></PageLayout>
);

export const Default = Template.bind({});
export const PageSticky = PageTemplate.bind({});
