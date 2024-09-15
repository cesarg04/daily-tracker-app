import { Snackbar, SnackbarProps } from "react-native-paper";

export interface ICustomSnackBarProps extends SnackbarProps {}

const Customsnackbar = (props: ICustomSnackBarProps) => {
  return <Snackbar {...props} />;
};

export default Customsnackbar;
