import { Image } from '@mantine/core';
import styled from '@emotion/styled';
import { Types } from '@typings/types';
import ArticleTag from '@components/articleTag';
import StatCounter from '@components/StatCounter';

interface Props {
  article: Types;
}

const GroupArticleCard = ({ article }: Props) => {
  return (
    <CardWrapper>
      <Image src={article.thumbnail} alt={'thumbnail-image'} height={200} />
      <InfoWrapper>
        <TagWrapper>
          <ArticleTag id={article.category.id} content={article.category.name} />
          <ArticleTag id={article.location.id} content={article.location.name} />
        </TagWrapper>
        <TitleText>{article.title}</TitleText>
        <CapacityText>
          {article.maxCapacity}명 중 {article.currentCapacity}명 참여중
        </CapacityText>
        <StatCounter variant="comment" count={article.commentCount} />
      </InfoWrapper>
    </CardWrapper>
  );
};

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
  gap: 8px;
  padding: 0.8rem;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const TitleText = styled.span`
  font-size: 14px;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CapacityText = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray[6]};
`;

export default GroupArticleCard;
