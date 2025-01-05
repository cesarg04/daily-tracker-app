import * as Yup from 'yup';

export const registerFormSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido').default(''),
  email: Yup.string().email().required('El correo es requerido').default(''),
  password: Yup.string()
    .min(8, 'La contraseña debe tener almenos 8 caracteres')
    .required('La contraseña es requerida')
    .default(''),
  username: Yup.string()
    .min(8, 'El nombre de usuario debe tener almenos 8 caracteres.')
    .required('El nombre de usuario es requerido')
    .default(''),
  phoneNumber: Yup.string()
    .matches(
      /^[0-9]{10,15}$/,
      'El número de teléfono debe contener entre 10 y 15 dígitos.'
    )
    .required('El número de teléfono es obligatorio')
    .default(''),
});

export type TRegisterFormType = Yup.InferType<typeof registerFormSchema>;
export const registerFormDefaultValues: TRegisterFormType =
  registerFormSchema.cast({});
