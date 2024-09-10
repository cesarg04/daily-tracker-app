import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EModalEventType,
  IEventModal,
  IMetaRef,
  IModalContextProviderProps,
  IModalFunctionOptions,
  IModalReturn,
} from "./modal-context.types";
import React from "react";
import { Dialog, Modal, Portal, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const ModalsContext = createContext<IModalReturn | undefined>(undefined);

const ModalContextProvider = ({ children }: IModalContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const promiseRef =
    useRef<(value: IEventModal | PromiseLike<IEventModal>) => void>();
  const metaRef = useRef<IMetaRef>();

  const modal = useCallback((p: IModalFunctionOptions) => {
    metaRef.current = p;
    if (metaRef.current) {
      setIsOpen(true);
    }
    return new Promise<IEventModal>((resolve) => {
      promiseRef.current = resolve;
    });
  }, []);

  const onClose = useCallback((value?: IEventModal["value"]) => {
    setIsOpen(false);
    if (promiseRef.current)
      promiseRef.current({ type: EModalEventType.CLOSE, value });
  }, []);

  const onDismiss = useCallback((value?: IEventModal["value"]) => {
    setIsOpen(false);
    if (promiseRef.current)
      promiseRef.current({ type: EModalEventType.DISMISS, value });
  }, []);

  const onConfirm = useCallback((value?: IEventModal["value"]) => {
    setIsOpen(false);
    if (promiseRef.current)
      promiseRef.current({ type: EModalEventType.CONFIRM, value });
  }, []);

  useEffect(() => {}, []);

  return (
    <ModalsContext.Provider
      value={{
        modal,
        onClose,
        onConfirm,
        onDismiss,
      }}
    >
      {children}
      {isOpen && (
        <Portal>
          <Dialog visible={isOpen}>
            {metaRef.current?.template &&
              React.cloneElement(metaRef.current?.template as ReactElement, {})}
          </Dialog>
        </Portal>
      )}
    </ModalsContext.Provider>
  );
};

export default ModalContextProvider;

const styles = StyleSheet.create({
  modalStyles: {
    backgroundColor: "#312B5C",
    borderColor: "#6B5DB0",
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 40,
  },
  wrap: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
