import { Image } from '@mantine/core';
import { ArticlePreviewType } from '@typings/types';
import ArticleTag from '@components/common/ArticleTag';
import StatCounter from '@components/common/StatCounter';
import { ArticleStatus, ArticleStatusKr } from '@constants/article';
import {
  CapacityText,
  CardWrapper,
  DimmedBox,
  InfoWrapper,
  TagWrapper,
  TitleText,
  ClosedText,
} from '@components/common/GroupArticleCard/styles';
import { getCommonBadgeColor, getStatusBadgeColor } from '@utils/colors';
import { CategoryKr } from '@constants/category';
import { LocationKr } from '@constants/location';

interface Props {
  article: ArticlePreviewType;
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
          <ArticleTag
            color={getStatusBadgeColor(article.status)}
            content={ArticleStatusKr[article.status]}
          />
          <ArticleTag
            color={getCommonBadgeColor(article.category.id)}
            content={CategoryKr[article.category.name]}
          />
          <ArticleTag
            color={getCommonBadgeColor(article.location.id)}
            content={LocationKr[article.location.name]}
          />
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
