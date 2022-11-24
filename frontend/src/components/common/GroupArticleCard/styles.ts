import styled from '@emotion/styled';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30.7rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[2]};
  overflow: hidden;
`;

const DimmedBox = styled.div`
  display: flex;
  position: absolute;
  width: 17.3rem;
  height: 30.7rem;
  z-index: 1;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
`;

const ClosedText = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 2rem;
  font-weight: 800;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const TitleText = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CapacityText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray[6]};
`;

export { CardWrapper, DimmedBox, InfoWrapper, TagWrapper, TitleText, CapacityText, ClosedText };
