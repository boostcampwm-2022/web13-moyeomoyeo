import styled from '@emotion/styled';
import { IconHome2, IconBell, IconUser } from '@tabler/icons';
import { useTheme } from '@emotion/react';
import { Tabs } from '@constants/tabs';

interface Props {
  currentTab: Tabs;
}

const Footer = ({ currentTab }: Props) => {
  const {
    colors: { indigo, gray },
  } = useTheme();

  return (
    <FooterWrapper>
      <TabDiv>
        <IconHome2 color={currentTab === Tabs.MAIN ? indigo[7] : gray[2]} />
      </TabDiv>
      <TabDiv>
        <IconBell color={currentTab === Tabs.NOTIFICATION ? indigo[7] : gray[2]} />
      </TabDiv>
      <TabDiv>
        <IconUser color={currentTab === Tabs.MY ? indigo[7] : gray[2]} />
      </TabDiv>
    </FooterWrapper>
  );
};

const TabDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const FooterWrapper = styled.div`
  display: flex;
  height: 5.6rem;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.1);
`;

export default Footer;
