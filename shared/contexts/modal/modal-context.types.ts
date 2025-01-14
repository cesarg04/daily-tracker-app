import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IOptionsModal {
  style?: StyleProp<TextStyle>;
}

export interface IMetaRef {
  template: ReactNode;
  options?: IOptionsModal;
  data?: unknown;
}

export interface IModalFunctionOptions extends IMetaRef {
  template: ReactNode;
  options?: IOptionsModal;
}

export enum EModalEventType {
  DISMISS = 'dismiss',
  CLOSE = 'close',
  CONFIRM = 'confirm',
}

export type ModalEventType =
  | EModalEventType.DISMISS
  | EModalEventType.CLOSE
  | EModalEventType.CONFIRM;

export interface IEventModal {
  type: ModalEventType;
  value?: unknown;
}

export interface IModalReturn {
  onClose: (value?: IEventModal['value']) => void;
  onDismiss: (value?: IEventModal['value']) => void;
  onConfirm: (value?: IEventModal['value']) => void;
  modal: (p: IModalFunctionOptions) => Promise<IEventModal>;
  snackBar: (p: ISnackBarRef) => void;
}

export interface IModalContextProviderProps {
  children: React.ReactNode;
}

// SnackBar

export interface ISnackBarRef {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  options?: {
    duration?: number;
    styles?: StyleProp<ViewStyle>;
    actionLabel?: string;
    onPress?: () => void;
  };
}
