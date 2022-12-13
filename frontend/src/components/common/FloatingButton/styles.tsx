import styled from '@emotion/styled';
import { ActionIcon, ActionIconProps, createPolymorphicComponent } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import { transientOptions } from '@styles/utils';

// https://mantine.dev/styles/styled/#polymorphic-components
const _FABWrapper = styled(ActionIcon)`
  position: fixed;
  bottom: 7.2rem;
  right: 1.6rem;
  z-index: 200;
  @media screen and (min-width: 600px) {
    right: calc(50vw - 300px + 1.6rem);
  }
`;

const FABWrapper = createPolymorphicComponent<'button', ActionIconProps>(_FABWrapper);

interface StyledIconPlusProps {
  $opened: boolean;
}

const StyledIconPlus = styled(IconPlus, transientOptions)<StyledIconPlusProps>`
  transition: transform 0.2s ease-in-out;
  ${({ $opened }) => $opened && `transform: rotate(45deg);`}
`;

export { FABWrapper, StyledIconPlus };
