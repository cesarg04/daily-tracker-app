import { useEffect } from 'react';

import useModal from './useModal';
import CustomAlertTemplate, {
  ICustomAlertTemplateProps,
} from '../components/alerts/CustomAlertTemplate';

const useAlert = () => {
  const { modal, onClose, onConfirm } = useModal();

  const alert = (props: ICustomAlertTemplateProps) => {
    return modal({
      template: (
        <CustomAlertTemplate
          {...props}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      ),
      options: {
        style: {
          minHeight: 220,
          backgroundColor: 'white',
        },
      },
    });
  };

  useEffect(() => {}, []);

  return {
    alert,
  };
};

export default useAlert;
