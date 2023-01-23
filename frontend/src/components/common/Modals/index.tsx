import { FunctionComponent } from 'react';

import ParticipantsModal from '@components/article/ParticipantsModal';
import ConfirmModal from '@components/common/ConfirmModal';
import useModals from '@hooks/useModals';

export const modals = {
  confirm: ConfirmModal as FunctionComponent,
  participants: ParticipantsModal as FunctionComponent,
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
