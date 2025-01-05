import { useContext } from 'react';
import { ModalsContext } from '../contexts/modal/ModalContext';

function useModal() {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error('ModalContext must be used within a ModalContextProvider');
  }

  return context;
}

export default useModal;
