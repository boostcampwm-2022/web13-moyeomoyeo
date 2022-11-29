import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ERROR_MESSAGE } from '@constants/error';

import ErrorMessage from '.';

export default {
  title: 'Component/ErrorMessage',
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => <ErrorMessage {...args} />;

export const _404 = Template.bind({});
_404.args = {
  errorCode: 404,
  title: ERROR_MESSAGE['404'].title,
  description: ERROR_MESSAGE['404'].description,
  subDescription: ERROR_MESSAGE['404'].subDescription,
};

export const _500 = Template.bind({});
_500.args = {
  errorCode: 500,
  title: ERROR_MESSAGE['500'].title,
  description: ERROR_MESSAGE['500'].description,
  subDescription: ERROR_MESSAGE['500'].subDescription,
};
