import * as Yup from 'yup';

export const registerFormSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido").default(''),
    email: Yup.string().email().required('El correo es requerido').default(''),
    password: Yup.string().min(8, 'La contraseña debe tener almenos 8 caracteres').required('La contraseña es requerida').default('')
})

export type RegisterFormType = Yup.InferType<typeof registerFormSchema>;
export const registerFormDefaultValues: RegisterFormType = registerFormSchema.cast({})