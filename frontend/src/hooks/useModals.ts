import { ComponentProps, FunctionComponent, useCallback } from 'react';

import { useRecoilState } from 'recoil';

import { modalsAtom } from '@recoil/atoms';

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalsAtom);

  const openModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T, props: Omit<ComponentProps<T>, 'open'>) => {
      setModals((modals) => [...modals, { Component, props: { ...props, open: true } }]);
    },
    []
  );

  const closeModal = useCallback(<T extends FunctionComponent<any>>(Component: T) => {
    setModals((modals) => modals.filter((modal) => modal.Component !== Component));
  }, []);

  return {
    modals,
    openModal,
    closeModal,
  };
};

export default useModals;
