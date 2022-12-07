import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Progress, TypographyStylesProvider } from '@mantine/core';
import { IconList } from '@tabler/icons';

import MenuButton from '@components/article/MenuButton';
import ParticipantsModal from '@components/article/ParticipantsModal';
import ParticipateButton from '@components/article/ParticipateButton';
import ArticleLoading from '@components/common/ArticleLoading';
import ArticleTag from '@components/common/ArticleTag';
import Avatar from '@components/common/Avatar';
import Header from '@components/common/Header';
import DetailTitle from '@components/common/Header/DetailTitle';
import PageLayout from '@components/common/PageLayout';
import StatCounter from '@components/common/StatCounter';
import { ArticleStatus, ArticleStatusKr } from '@constants/article';
import { CategoryKr } from '@constants/category';
import { CATEGORY_COLOR, LOCATION_COLOR, STATUS_COLOR } from '@constants/color';
import { LocationKr } from '@constants/location';
import { PAGE_TITLE } from '@constants/pageTitle';
import { ParticipateButtonStatus } from '@constants/participateButton';
import useFetchApplicationStatus from '@hooks/queries/useFetchApplicationStatus';
import useFetchArticle from '@hooks/queries/useFetchArticle';
import useFetchChatUrl from '@hooks/queries/useFetchChatUrl';
import useFetchMyInfo from '@hooks/queries/useFetchMyInfo';
import useFetchParticipants from '@hooks/queries/useFetchParticipants';
import { ArticleType } from '@typings/types';
import dateTimeFormat from '@utils/dateTime';

const ArticleDetail = () => {
  const {
    colors: { indigo, gray },
  } = useTheme();
  const router = useRouter();
  const articleId = Number(router.query.id);
  const { data: myInfo } = useFetchMyInfo();
  const { article } = useFetchArticle(articleId);
  const { isJoined } = useFetchApplicationStatus(articleId);
  const { data: participants } = useFetchParticipants(articleId);
  const { url } = useFetchChatUrl(
    articleId,
    getButtonStatus(article, participants.length, isJoined) === ParticipateButtonStatus.LINK
  );

  const [participantsModalOpen, setParticipantsModalOpen] = useState<boolean>(false);

  return (
    <>
      <PageLayout
        header={
          <Header
            leftNode={
              <DetailTitle
                title={PAGE_TITLE.ARTICLE.title}
                subTitle={PAGE_TITLE.ARTICLE.subTitle}
              />
            }
            rightNode={
              article &&
              myInfo &&
              article.author.id === myInfo.id && (
                <MenuButton isArticleInProgress={article.status === ArticleStatus.PROGRESS} />
              )
            }
          />
        }
      >
        <>
          {!article || isJoined === undefined || !myInfo || !participants ? (
            <ArticleLoading />
          ) : (
            <>
              <ContentWrapper>
                <DetailWrapper>
                  <ProfileWrapper>
                    <Link href={`/user/${article.author.id}`}>
                      <Avatar
                        src={article.author.profileImage}
                        alt={article.author.userName}
                        size="lg"
                      />
                    </Link>
                    <ProfileTextWrapper>
                      <Author>{article.author.userName}</Author>
                      <Time>{dateTimeFormat(article.createdAt)}</Time>
                    </ProfileTextWrapper>
                  </ProfileWrapper>
                  <Title>{article.title}</Title>
                  <TagWrapper>
                    <ArticleTag
                      color={STATUS_COLOR[article.status]}
                      content={ArticleStatusKr[article.status]}
                      size="lg"
                    />
                    <ArticleTag
                      color={CATEGORY_COLOR[article.category]}
                      content={CategoryKr[article.category]}
                      size="lg"
                    />
                    <ArticleTag
                      color={LOCATION_COLOR[article.location]}
                      content={LocationKr[article.location]}
                      size="lg"
                    />
                  </TagWrapper>
                  <ParticipantWrapper>
                    <StatusWrapper>
                      <StatusText>모집 현황</StatusText>
                      <CountText>
                        {participants.length}명 / {article.maxCapacity}명
                      </CountText>
                    </StatusWrapper>
                    <ParticipantButton onClick={() => setParticipantsModalOpen(true)}>
                      <IconList width="16" height="16" color={gray[6]} />
                      <ViewText>신청자 확인</ViewText>
                    </ParticipantButton>
                  </ParticipantWrapper>
                  <Progress
                    value={(article.currentCapacity / article.maxCapacity) * 100}
                    size="lg"
                    radius="lg"
                    color={indigo[7]}
                  />
                  <TypographyStylesProvider>
                    <ContentBox dangerouslySetInnerHTML={{ __html: article.contents }} />
                  </TypographyStylesProvider>
                  {article.author.id !== myInfo.id && (
                    <ParticipateButton
                      status={getButtonStatus(article, participants.length, isJoined)}
                      groupArticleId={article.id}
                      chatRoomLink={url}
                    />
                  )}
                  <StatCounter variant="comment" count={article.commentCount} />
                </DetailWrapper>
                <Divider />
                <CommentWrapper>
                  <div>댓글영역</div>
                </CommentWrapper>
              </ContentWrapper>
              <ParticipantsModal
                participants={participants}
                open={participantsModalOpen}
                onClose={() => setParticipantsModalOpen(false)}
              />
            </>
          )}
        </>
      </PageLayout>
      r
    </>
  );
};

export default ArticleDetail;

const getButtonStatus = (article: ArticleType, currentCapacity: number, isJoined: boolean) => {
  if (!article || isJoined === undefined || article.maxCapacity === currentCapacity)
    return ParticipateButtonStatus.CLOSED;

  switch (article.status) {
    case ArticleStatus.PROGRESS:
      return isJoined ? ParticipateButtonStatus.CANCEL : ParticipateButtonStatus.APPLY;
    case ArticleStatus.SUCCEED:
      return isJoined ? ParticipateButtonStatus.LINK : ParticipateButtonStatus.CLOSED;
    case ArticleStatus.FAIL:
      return ParticipateButtonStatus.CLOSED;
    default:
      return ParticipateButtonStatus.CLOSED;
  }
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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
