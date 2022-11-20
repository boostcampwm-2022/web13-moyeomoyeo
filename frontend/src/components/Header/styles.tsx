import styled from '@emotion/styled';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  height: 6.4rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export { HeaderWrapper };
