import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066CC', // Azul oscuro para botones y encabezados
    accent: '#0066CC', // Azul oscuro para botones secundarios
    background: '#F0F0F0', // Gris claro para el fondo de la pantalla
    surface: '#FFFFFF', // Blanco para tarjetas y elementos de la interfaz
    text: '#333333', // Negro suave para el texto principal
    placeholder: '#666666', // Gris medio para texto secundario,
    error: 'red',
  },
};

export default theme;
