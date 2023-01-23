import { ComponentProps, FunctionComponent } from 'react';

import loadable from '@loadable/component';

import useModals from '@hooks/useModals';

const ConfirmModal = loadable(() => import('@components/common/ConfirmModal'), { ssr: false });
const ParticipantsModal = loadable(() => import('@components/article/ParticipantsModal'), {
  ssr: false,
});

export const modals = {
  confirm: ConfirmModal as FunctionComponent<ComponentProps<typeof ConfirmModal>>,
  participants: ParticipantsModal as FunctionComponent<ComponentProps<typeof ParticipantsModal>>,
};

const Modals = () => {
  const { modals } = useModals();

  return (
    <>
      {modals.map(({ Component, props }, idx) => {
        return <Component key={idx} {...props} />;
      })}
    </>
  );
};

export default Modals;
