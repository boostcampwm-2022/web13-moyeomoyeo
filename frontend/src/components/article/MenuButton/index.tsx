import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { Menu, Text } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons';

import useDeleteArticle from '@hooks/queries/useDeleteArticle';

interface Props {
  isInProgress: boolean;
}

const MenuButton = ({ isInProgress }: Props) => {
  const router = useRouter();
  const articleId = Number(router.query.id);
  const { mutate: deleteArticle } = useDeleteArticle();

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
            onClick={() => {
              deleteArticle(articleId, {
                onSuccess: () => router.back(),
              });
            }}
          >
            게시글 삭제
          </Text>
        </Menu.Item>
        <Menu.Item p="md">
          <Text fz="md">URL 복사하기</Text>
        </Menu.Item>
        {isInProgress && (
          <>
            <Menu.Item p="md">
              <Text fz="md">모집 중단으로 변경</Text>
            </Menu.Item>
            <Menu.Item p="md">
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
