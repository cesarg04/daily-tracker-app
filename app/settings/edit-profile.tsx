import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { userServices } from '@/shared/services/user/user.services';
import Loading from '@/shared/components/loading/Loading';
import { Avatar, Button } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import FormColorImagePicker from '@/shared/components/form/form-button-image-picker/FormColorImagePicker';
import { FormProvider, useForm } from 'react-hook-form';
import {
  TUpdateProfileFormType,
  updateProfileFormDefaultValues,
  updateProfileSchema,
} from '@/private/modules/settings/util/update-profile.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@/shared/components/form/form-control/FormControl';
import FormLabel from '@/shared/components/form/form-label/FormLabel';
import TextField from '@/shared/components/form/form-text-fields/TextField';
import FormError from '@/shared/components/form/form-error/FormError';
import KeyboardAvoidingContainer from '@/shared/components/keyboard-avoing-container/KeyboardAvoingContainer';
import PrimaryButton from '@/shared/components/buttons/PrimaryButton';
import useAuthStore from '@/shared/store/auth/auth.store';
import { patchAdapterUser } from '@/shared/services/user/patch-user.adapter';

const EditProfile = () => {
  const { useGetUser, useUpdateUser } = userServices();
  const { user } = useAuthStore();
  const currentUser = useGetUser();

  const initialLetter = useMemo(
    () => currentUser.data?.data?.full_name?.charAt(0).toUpperCase(),
    [currentUser.data?.data?.full_name]
  );

  const adapted = patchAdapterUser({
    userData: currentUser.data!,
    userStore: user!,
  });
  const formConfig = useForm<TUpdateProfileFormType>({
    defaultValues: adapted,
    resolver: yupResolver(updateProfileSchema),
  });
  const avatar = formConfig.watch('avatar');

  const onSubmit = (values: TUpdateProfileFormType) => {};

  const onInsert = async () => {
    const { data, error } = await useUpdateUser.mutateAsync(avatar);
  };

  if (currentUser.isLoading) {
    return <Loading />;
  }

  return (
    <FormProvider {...formConfig}>
      <KeyboardAvoidingContainer>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            {/* {avatar.length > 0 ? (
              <Avatar.Image size={100} source={{ uri: avatar.uri }} />
            ) : (
              <Avatar.Text
                style={{ backgroundColor: "#ccc" }}
                label={initialLetter ?? ""}
                size={100}
              />
            )} */}
            <FormControl name="avatar">
              <FormColorImagePicker />
            </FormControl>
          </View>
          <View style={styles.itemContainer}>
            <FormControl name="name">
              <FormLabel color="black">Nombre</FormLabel>
              <TextField />
              <FormError />
            </FormControl>
            <FormControl name="email">
              <FormLabel color="black">Correo electronico</FormLabel>
              <TextField disabled />
              <FormError />
            </FormControl>

            <FormControl name="username">
              <FormLabel color="black">Usuario</FormLabel>
              <TextField />
              <FormError />
            </FormControl>

            <FormControl name="phone">
              <FormLabel color="black">Telefono</FormLabel>
              <TextField mask="phoneNumber" keyboardType="numeric" />
              <FormError />
            </FormControl>

            <PrimaryButton
              onPress={onInsert}
              disabled={formConfig.formState.isSubmitting}
              loading={useUpdateUser.status === 'pending'}
            >
              Guardar cambios
            </PrimaryButton>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </FormProvider>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  itemContainer: {
    marginTop: 20,
  },
});
