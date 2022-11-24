import { ReactNode } from 'react';
import { HeaderWrapper } from '@components/common/Header/styles';

interface Props {
  /**
   * 왼쪽에 위치할 자식 요소를 전달합니다.
   */
  leftNode: ReactNode;
  /**
   * 오른쪽에 위치할 자식 요소를 전달합니다.
   */
  rightNode?: ReactNode;
}

const Header = ({ leftNode, rightNode }: Props) => {
  return (
    <HeaderWrapper>
      {leftNode}
      {rightNode}
    </HeaderWrapper>
  );
};
export default Header;
