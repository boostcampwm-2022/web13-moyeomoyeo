import { Image } from '@mantine/core';

import ArticleTag from '@components/common/ArticleTag';
import {
  CapacityText,
  CardWrapper,
  ClosedText,
  DimmedBox,
  InfoWrapper,
  TagWrapper,
  TitleText,
} from '@components/common/GroupArticleCard/styles';
import StatCounter from '@components/common/StatCounter';
import { ArticleStatus, ArticleStatusKr } from '@constants/article';
import { CategoryKr } from '@constants/category';
import { CATEGORY_COLOR, LOCATION_COLOR, STATUS_COLOR } from '@constants/color';
import { LocationKr } from '@constants/location';
import { ArticlePreviewType } from '@typings/types';

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
            color={STATUS_COLOR[article.status]}
            content={ArticleStatusKr[article.status]}
          />
          <ArticleTag
            color={CATEGORY_COLOR[article.category]}
            content={CategoryKr[article.category]}
          />
          <ArticleTag
            color={LOCATION_COLOR[article.location]}
            content={LocationKr[article.location]}
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
