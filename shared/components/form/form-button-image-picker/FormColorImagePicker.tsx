import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useFormControlContext } from '../form-control/FormControl';
import useAuthStore from '@/shared/store/auth/auth.store';

interface IFormColorImagePickerProps {
  title?: React.ReactNode | string;
}

const FormColorImagePicker = (props: IFormColorImagePickerProps) => {
  const {
    field,
    fieldState: { error },
  } = useFormControlContext();
  const { user } = useAuthStore();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permiso denegado para acceder a la galería.');
      return;
    }

    // Seleccionar imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const filePath = `${
        user?.id
      }/${new Date().getTime()}.${result.assets[0].fileName
        ?.split('.')
        .pop()
        ?.toLowerCase()}`;

      field.onChange({
        uri: imageUri,
        filePath,
        conyentType: result.assets[0].mimeType,
      });
    }
  };

  return (
    <Button
      style={styles.buttonAvatar}
      icon={() => <Ionicons size={25} name="camera-outline" />}
      mode="outlined"
      labelStyle={{
        fontSize: 20,
        color: 'black',
      }}
      onPress={pickImage}
    >
      {props.title ? props.title : 'Cambiar foto'}
    </Button>
  );
};

export default FormColorImagePicker;

const styles = StyleSheet.create({
  buttonAvatar: {
    borderRadius: 10,
  },
});
