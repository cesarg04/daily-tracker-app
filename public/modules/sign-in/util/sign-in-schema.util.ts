import * as Yup from 'yup';

export const signInFormSchema = Yup.object().shape({
  email: Yup.string().email().required('El correo es requerido').default(''),
  password: Yup.string()
    .min(8, 'La contraseña debe tener almenos 8 caracteres')
    .required('La contraseña es requerida')
    .default(''),
});

export type SignInFormType = Yup.InferType<typeof signInFormSchema>;
export const signInFormDefaultValues: SignInFormType = signInFormSchema.cast(
  {}
);
