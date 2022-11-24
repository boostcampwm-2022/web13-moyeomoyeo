import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  height: 6.4rem;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

export { HeaderWrapper };
