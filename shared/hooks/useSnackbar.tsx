import { useState } from 'react';
import Snackbar, {
  ICustomSnackBarProps,
} from '../components/snackbar/snackbar'; // Importa el componente Snackbar
import { ISnackBarRef } from '../contexts/modal/modal-context.types';
import useModal from './useModal';

interface IUseSnackbarSettins extends ISnackBarRef {}

const useSnackbar = () => {
  const { snackBar: _snackBar } = useModal();

  const snackBar = (props: ISnackBarRef) => {
    return _snackBar({
      ...props,
    });
  };

  return {
    snackBar,
  };
};

export default useSnackbar;
