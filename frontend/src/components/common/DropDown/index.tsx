import styled from '@emotion/styled';
import { Select, SelectProps } from '@mantine/core';

interface Props extends SelectProps {}

const DropDown = (props: Props) => {
  return <StyledSelect size="md" {...props} />;
};

const StyledSelect = styled(Select)`
  width: 100%;
  & .mantine-Select-item {
    padding: 1.6rem;
    &[data-selected] {
      &,
      &:hover {
        background-color: ${({ theme }) => theme.colors.indigo[0]};
        color: ${({ theme }) => theme.colors.indigo[7]};
      }
    }
  }

  & .mantine-Select-label {
    padding-bottom: 0.4rem;
  }
`;

export default DropDown;
