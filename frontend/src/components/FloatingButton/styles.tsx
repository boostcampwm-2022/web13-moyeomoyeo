import styled from '@emotion/styled';
import { ActionIcon, ActionIconProps, createPolymorphicComponent } from '@mantine/core';

interface FABWrapperProps extends ActionIconProps {
  opened: boolean;
}

// https://mantine.dev/styles/styled/#polymorphic-components
const _FABWrapper = styled(ActionIcon)<{ opened: boolean }>`
  position: fixed;
  bottom: 7.2rem;
  right: 1.6rem;
  transition: transform 0.2s ease-in-out;
  ${({ opened }) => opened && `transform: rotate(45deg);`}
`;

const FABWrapper = createPolymorphicComponent<'button', FABWrapperProps>(_FABWrapper);

export { FABWrapper };
