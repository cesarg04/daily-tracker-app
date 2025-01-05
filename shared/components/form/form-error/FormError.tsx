import { HelperText, HelperTextProps } from 'react-native-paper';
import { useFormControlContext } from '../form-control/FormControl';

type omit = 'children' | 'type';

interface IFormErrorProps extends Omit<HelperTextProps, omit> {}

const FormError = (props: IFormErrorProps) => {
  const {
    fieldState: { error },
  } = useFormControlContext();
  return (
    <HelperText
      style={{ fontSize: 15, fontWeight: 'bold' }}
      type="error"
      visible={!!error}
      {...props}
    >
      {error?.message}
    </HelperText>
  );
};

export default FormError;
