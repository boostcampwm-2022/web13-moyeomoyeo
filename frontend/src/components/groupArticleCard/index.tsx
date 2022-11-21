import { Image } from '@mantine/core';
import { Types } from '@typings/types';
import ArticleTag from '@components/articleTag';
import StatCounter from '@components/StatCounter';
import {
  CardWrapper,
  InfoWrapper,
  TagWrapper,
  TitleText,
  CapacityText,
} from '@components/groupArticleCard/styles';

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

export default GroupArticleCard;
