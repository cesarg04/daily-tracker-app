import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

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
  DISMISS = "dismiss",
  CLOSE = "close",
  CONFIRM = "confirm",
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
  onClose: (value?: IEventModal["value"]) => void;
  onDismiss: (value?: IEventModal["value"]) => void;
  onConfirm: (value?: IEventModal["value"]) => void;
  modal: (p: IModalFunctionOptions) => Promise<IEventModal>;
}

export interface IModalContextProviderProps {
  children: React.ReactNode;
}