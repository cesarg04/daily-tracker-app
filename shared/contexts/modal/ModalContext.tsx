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
  ISnackBarRef,
} from "./modal-context.types";
import React from "react";
import { Dialog, IconButton, Modal, Portal, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Customsnackbar from "@/shared/components/snackbar/snackbar";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "@/shared/theme/theme";

export const ModalsContext = createContext<IModalReturn | undefined>(undefined);

const ModalContextProvider = ({ children }: IModalContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const promiseRef =
    useRef<(value: IEventModal | PromiseLike<IEventModal>) => void>();
  const metaRef = useRef<IMetaRef>();

  const snackbarRef = useRef<ISnackBarRef>();

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

  const snackBar = useCallback((e: ISnackBarRef) => {
    snackbarRef.current = e;

    if (snackbarRef.current) {
      setTimeout(() => {
        setSnackBarIsOpen(true);
      }, 1000);
    }
  }, []);

  const onCLoseSnack = () => {
    setSnackBarIsOpen(false);
  };

  useEffect(() => {}, [snackbarRef]);

  return (
    <ModalsContext.Provider
      value={{
        modal,
        onClose,
        onConfirm,
        onDismiss,
        snackBar,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {snackBarIsOpen && (
          <Customsnackbar
            onDismiss={onCLoseSnack}
            visible={snackBarIsOpen}
            type={snackbarRef.current?.type ?? "info"}
            duration={snackbarRef.current?.options?.duration}
            action={{
              label: snackbarRef.current?.options?.actionLabel ?? "Cerrar",
              onPress: snackbarRef.current?.options?.onPress,
              textColor: "white",
            }}
            message={snackbarRef.current?.message}
          />
        )}

        {children}
        {isOpen && (
          <Portal>
            <Dialog visible={isOpen}>
              {metaRef.current?.template &&
                React.cloneElement(
                  metaRef.current?.template as ReactElement,
                  {}
                )}
            </Dialog>
          </Portal>
        )}
      </View>
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
