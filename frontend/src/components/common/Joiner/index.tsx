import { Fragment, ReactNode } from 'react';
import styled from '@emotion/styled';

interface JoinerProps {
  components: ReactNode[];
  before?: boolean;
  after?: boolean;
}

export default function Joiner({ components, before, after }: JoinerProps) {
  return (
    <>
      {before && <Separator />}
      {components.length > 0 &&
        components.reduce((prev, curr) => (
          <Fragment>
            {prev}
            <Separator />
            {curr}
          </Fragment>
        ))}
      {after && <Separator />}
    </>
  );
}

const Separator = styled.div`
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.gray[2]};
`;
