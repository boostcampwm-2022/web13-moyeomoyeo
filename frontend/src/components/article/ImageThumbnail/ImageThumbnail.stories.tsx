import { ComponentMeta, ComponentStory } from '@storybook/react';

import ImageThumbnail from '.';

export default {
  title: 'Component/ImageThumbnail',
  component: ImageThumbnail,
} as ComponentMeta<typeof ImageThumbnail>;

const Template: ComponentStory<typeof ImageThumbnail> = (args) => <ImageThumbnail {...args} />;

export const NoImageURL = Template.bind({});
