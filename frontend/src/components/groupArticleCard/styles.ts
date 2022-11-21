import styled from '@emotion/styled';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.3rem;
  height: 30.7rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[2]};
  overflow: hidden;
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

export { CardWrapper, InfoWrapper, TagWrapper, TitleText, CapacityText };
