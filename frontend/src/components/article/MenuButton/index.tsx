import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styled from '@emotion/styled';
import { Menu, Text } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons';

import { modals } from '@components/common/Modals';
import useCancelRecruitment from '@hooks/queries/useCancelRecruitment';
import useCompleteRecruitment from '@hooks/queries/useCompleteRecruitment';
import useDeleteArticle from '@hooks/queries/useDeleteArticle';
import useClipboard from '@hooks/useClipboard';
import useModals from '@hooks/useModals';
import { showToast } from '@utils/toast';

interface Props {
  isArticleInProgress: boolean;
}

const MenuButton = ({ isArticleInProgress }: Props) => {
  const router = useRouter();
  const articleId = Number(router.query.id);
  const { mutate: deleteArticle } = useDeleteArticle();
  const { mutate: cancelRecruitment } = useCancelRecruitment();
  const { mutate: completeRecruitment } = useCompleteRecruitment();
  const { isCopied, setIsCopied, doCopy } = useClipboard();

  const { openModal, closeModal } = useModals();

  const handleClickConfirmDelete = () => {
    deleteArticle(articleId, {
      onSuccess: () => {
        showToast({ title: '게시글 삭제 완료!', message: '다른 게시글도 올려보세요.' });
        closeModal(modals.confirm);
        router.back();
      },
    });
  };

  const handleClickConfirmCancel = () => {
    cancelRecruitment(articleId, {
      onSuccess: () => {
        closeModal(modals.confirm);
        showToast({ title: '모집 중단 완료!', message: '다른 게시글도 올려보세요.' });
      },
    });
  };

  const handleClickConfirmComplete = () => {
    completeRecruitment(articleId, {
      onSuccess: () => {
        closeModal(modals.confirm);
        showToast({ title: '모집 성공 완료!', message: '오픈 채팅방에 참여해보세요.' });
      },
    });
  };

  useEffect(() => {
    if (isCopied) {
      showToast({ title: 'URL 복사 완료', message: '친구에게 공유해보세요' });
      setIsCopied(false);
    }
  }, [isCopied, setIsCopied]);

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <StyledButton>
          <IconDotsVertical />
        </StyledButton>
      </Menu.Target>
      <MenuDropdown>
        <Menu.Item p="md">
          <Link href={`/article/edit/${articleId}`}>
            <Text fz="md">게시글 수정</Text>
          </Link>
        </Menu.Item>
        <Menu.Item p="md">
          <Text
            fz="md"
            onClick={() =>
              openModal(modals.confirm, {
                message: '게시글을 삭제하시겠습니까?',
                onConfirmButtonClick: handleClickConfirmDelete,
                onCancelButtonClick: () => closeModal(modals.confirm),
              })
            }
          >
            게시글 삭제
          </Text>
        </Menu.Item>
        <Menu.Item p="md" onClick={() => doCopy(window.location.href)}>
          <Text fz="md">URL 복사하기</Text>
        </Menu.Item>
        {isArticleInProgress && (
          <>
            <Menu.Item
              p="md"
              onClick={() =>
                openModal(modals.confirm, {
                  message: '모집을 중단하시겠습니까?',
                  onConfirmButtonClick: handleClickConfirmCancel,
                  onCancelButtonClick: () => closeModal(modals.confirm),
                })
              }
            >
              <Text fz="md">모집 중단으로 변경</Text>
            </Menu.Item>
            <Menu.Item
              p="md"
              onClick={() =>
                openModal(modals.confirm, {
                  message: '모집을 완료하시겠습니까?',
                  onConfirmButtonClick: handleClickConfirmComplete,
                  onCancelButtonClick: () => closeModal(modals.confirm),
                })
              }
            >
              <Text fz="md">모집 완료로 변경</Text>
            </Menu.Item>
          </>
        )}
      </MenuDropdown>
    </Menu>
  );
};

export default MenuButton;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.white};
  border: none;
`;

const MenuDropdown = styled(Menu.Dropdown)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
`;
