import { stylesMap } from '@/shared/constants/alerts/alerts-colors.const';
import theme from '@/shared/theme/theme';
import { Platform } from 'react-native';
import { Snackbar, SnackbarProps } from 'react-native-paper';

export interface ICustomSnackBarProps extends Omit<SnackbarProps, 'children'> {
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  message?: string;
}

const Customsnackbar = (props: ICustomSnackBarProps) => {
  const stylesType = stylesMap[props.type];
  return (
    <Snackbar
      wrapperStyle={{
        zIndex: 1000,
        bottom: Platform.OS === 'ios' ? 40 : 70,
      }}
      rippleColor={theme.colors.primary}
      style={{ backgroundColor: stylesType.iconColor }}
      {...props}
    >
      {props.message}
    </Snackbar>
  );
};

export default Customsnackbar;
