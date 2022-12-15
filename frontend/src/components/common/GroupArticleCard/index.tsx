import ArticleTag from '@components/common/ArticleTag';
import {
  CapacityText,
  CardWrapper,
  ClosedText,
  DimmedBox,
  ImageWrapper,
  InfoWrapper,
  TagWrapper,
  TitleText,
} from '@components/common/GroupArticleCard/styles';
import Image from '@components/common/Image';
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
  const {
    status,
    thumbnail: { originUrl, blurUrl },
    category,
    location,
    title,
    maxCapacity,
    currentCapacity,
    commentCount,
  } = article;
  return (
    <CardWrapper>
      {status !== ArticleStatus.PROGRESS && (
        <DimmedBox>
          <ClosedText>모집 종료</ClosedText>
        </DimmedBox>
      )}
      <ImageWrapper>
        <Image
          src={originUrl}
          alt={'thumbnail-image'}
          layout="fill"
          objectFit="cover"
          sizes="(min-width: 600px) 300px,150px"
          placeholder="blur"
          blurDataURL={blurUrl}
          style={{ transition: '0.2s ease-in-out' }}
          priority
        />
      </ImageWrapper>
      <InfoWrapper>
        <TagWrapper>
          <ArticleTag color={STATUS_COLOR[status]} content={ArticleStatusKr[status]} />
          <ArticleTag color={CATEGORY_COLOR[category]} content={CategoryKr[category]} />
          <ArticleTag color={LOCATION_COLOR[location]} content={LocationKr[location]} />
        </TagWrapper>
        <TitleText>{title}</TitleText>
        <CapacityText>
          {maxCapacity}명 중 {currentCapacity}명 참여중
        </CapacityText>
        <StatCounter variant="comment" count={commentCount} />
      </InfoWrapper>
    </CardWrapper>
  );
};

export default GroupArticleCard;
