import { useState } from "react";
import Snackbar, {
  ICustomSnackBarProps,
} from "../components/snackbar/snackbar"; // Importa el componente Snackbar

interface IUseSnackbarSettins extends ICustomSnackBarProps {
  duration?: number;
}

const useSnackbar = (options: IUseSnackbarSettins) => {
  const [isVisible, setIsVisible] = useState(false);

  const onToggleVisible = () => {
    setIsVisible(true); // Mostrar el Snackbar

    setTimeout(() => {
      setIsVisible(false); // Ocultar el Snackbar después de la duración
    }, options.duration ?? 3000);
  };

  // Retornar tanto la función como el componente SnackBar
  const SnackBarComponent = isVisible ? (
    <Snackbar {...options} visible={isVisible} />
  ) : null; // Si no es visible, retorna null

  return {
    onToggleVisible,
    SnackBarComponent,
  };
};

export default useSnackbar;
