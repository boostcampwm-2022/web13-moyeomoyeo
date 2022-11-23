import CommentInput from '.';
import PageLayout from '@components/common/PageLayout';

import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/CommentInput',
  component: CommentInput,
} as ComponentMeta<typeof CommentInput>;

const Template: ComponentStory<typeof CommentInput> = (args) => <CommentInput />;
const PageTemplate: ComponentStory<typeof CommentInput> = (args) => (
  <PageLayout>
    <CommentInput />
  </PageLayout>
);

export const Default = Template.bind({});

export const PageSticky = PageTemplate.bind({});
