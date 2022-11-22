import { Image } from '@mantine/core';
import { ArticleType } from '@typings/types';
import ArticleTag from '@components/ArticleTag';
import StatCounter from '@components/StatCounter';
import { ArticleStatus } from '@constants/article';
import {
  CapacityText,
  CardWrapper,
  DimmedBox,
  InfoWrapper,
  TagWrapper,
  TitleText,
  ClosedText,
} from '@components/GroupArticleCard/styles';

interface Props {
  article: ArticleType;
}

const GroupArticleCard = ({ article }: Props) => {
  return (
    <CardWrapper>
      {article.status !== ArticleStatus.PROGRESS && (
        <DimmedBox>
          <ClosedText>모집 종료</ClosedText>
        </DimmedBox>
      )}
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

export default GroupArticleCard;
