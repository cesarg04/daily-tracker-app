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
import { Animated, StyleSheet, View } from "react-native";
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
  const scaleAnim = useRef(new Animated.Value(0)).current; // Escala inicial 0
  const opacityAnim = useRef(new Animated.Value(0)).current; // Opacidad inicial 0

  useEffect(() => {
    if (isOpen) {
      // Si el diálogo se abre, animamos
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1, // Escala completa
          duration: 300, // Duración de la animación
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, // Opacidad completa
          duration: 300, // Duración de la animación
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Si el diálogo se cierra, animamos en reversa
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

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
            <Animated.View
              style={{
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Dialog style={{ backgroundColor: "white" }} visible={isOpen}>
                {metaRef.current?.template &&
                  React.cloneElement(
                    metaRef.current?.template as ReactElement,
                    {}
                  )}
              </Dialog>
            </Animated.View>
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
