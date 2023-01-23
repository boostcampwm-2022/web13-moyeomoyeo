import { FunctionComponent, useCallback } from 'react';

import { useRecoilState } from 'recoil';

import { modalsAtom } from '@recoil/atoms';

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalsAtom);

  const openModal = useCallback((Component: FunctionComponent, props: Object) => {
    setModals((modals) => [...modals, { Component, props: { ...props, open: true } }]);
  }, []);

  const closeModal = useCallback((Component: FunctionComponent) => {
    setModals((modals) => modals.filter((modal) => modal.Component !== Component));
  }, []);

  return {
    modals,
    openModal,
    closeModal,
  };
};

export default useModals;
