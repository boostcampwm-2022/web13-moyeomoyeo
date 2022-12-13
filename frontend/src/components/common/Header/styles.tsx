import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  height: 6.4rem;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

export { HeaderWrapper };
