import PageLayout from '@components/common/PageLayout';
import { Avatar, Progress } from '@mantine/core';
import styled from '@emotion/styled';
import { dummyArticle } from '@constants/dummy';
import ArticleTag from '@components/ArticleTag';
import { getCommonBadgeColor, getStatusBadgeColor } from '../../util/colors';
import { ArticleStatusKr } from '@constants/article';
import { CategoryKr } from '@constants/category';
import { LocationKr } from '@constants/location';
import { useTheme } from '@emotion/react';
import StatCounter from '@components/StatCounter';
import { IconList } from '@tabler/icons';

const ArticleDetail = () => {
  const {
    colors: { indigo, gray },
  } = useTheme();

  const {
    authorName,
    title,
    status,
    authorThumbnail,
    createdAt,
    category,
    location,
    contents,
    currentCapacity,
    maxCapacity,
    commentCount,
  } = dummyArticle;

  return (
    <PageLayout>
      <PageWrapper>
        <DetailWrapper>
          <ProfileWrapper>
            <Avatar radius="xl" size="lg" alt="avatar" src={authorThumbnail} />
            <ProfileTextWrapper>
              <Author>{authorName}</Author>
              <Time>{createdAt}</Time>
            </ProfileTextWrapper>
          </ProfileWrapper>
          <Title>{title}</Title>
          <TagWrapper>
            <ArticleTag
              color={getStatusBadgeColor(status)}
              content={ArticleStatusKr[status]}
              size="lg"
            />
            <ArticleTag
              color={getCommonBadgeColor(category.id)}
              content={CategoryKr[category.name]}
              size="lg"
            />
            <ArticleTag
              color={getCommonBadgeColor(location.id)}
              content={LocationKr[location.name]}
              size="lg"
            />
          </TagWrapper>
          <ParticipantWrapper>
            <StatusWrapper>
              <StatusText>모집 현황</StatusText>
              <CountText>
                {currentCapacity}명 / {maxCapacity}명
              </CountText>
            </StatusWrapper>
            <ParticipantButton>
              <IconList width="16" height="16" color={gray[6]} />
              <ViewText>신청자 확인</ViewText>
            </ParticipantButton>
          </ParticipantWrapper>
          <Progress
            value={(currentCapacity / maxCapacity) * 100}
            size="lg"
            radius="lg"
            color={indigo[7]}
          />
          {/* TODO html로 렌더링 */}
          <ContentBox>{contents}</ContentBox>
          <button>참가하기 버튼 자리</button>
          <StatCounter variant="comment" count={commentCount} />
        </DetailWrapper>
        <Divider />
        <CommentWrapper>
          <div>댓글영역</div>
        </CommentWrapper>
      </PageWrapper>
    </PageLayout>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Author = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Time = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[4]};
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: 800;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatusWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const StatusText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[4]};
`;

const CountText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;

const ParticipantButton = styled.button`
  display: flex;
  gap: 4px;
  padding: 0;
  height: 1.7rem;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.white};
  &:hover {
    cursor: pointer;
  }
`;

const ViewText = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[6]};
`;

const ContentBox = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[2]};
  border-radius: 8px;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.05rem;
  background-color: ${({ theme }) => theme.colors.gray[4]};
`;

export default ArticleDetail;
