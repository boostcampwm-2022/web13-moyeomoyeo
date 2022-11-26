import { ComponentMeta, ComponentStory } from '@storybook/react';

import Joiner from '.';

export default {
  title: 'Component/Joiner',
  component: Joiner,
} as ComponentMeta<typeof Joiner>;

const Template: ComponentStory<typeof Joiner> = (args) => <Joiner {...args} />;

export const _Joiner = Template.bind({});
_Joiner.args = {
  components: [<div key={1}>test1</div>, <div key={2}>test2</div>],
};
