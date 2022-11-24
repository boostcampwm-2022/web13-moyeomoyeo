import { IconPlus } from '@tabler/icons';
import styled from '@emotion/styled';
import { ActionIcon, ActionIconProps, createPolymorphicComponent } from '@mantine/core';
import { transientOptions } from '@styles/utils';

// https://mantine.dev/styles/styled/#polymorphic-components
const _FABWrapper = styled(ActionIcon)`
  position: fixed;
  bottom: 7.2rem;
  right: 1.6rem;
  z-index: 100;
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