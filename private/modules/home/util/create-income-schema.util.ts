import * as Yup from 'yup';

export const createIncomeSchema = Yup.object().shape({
  amount: Yup.string().required('El monto es requerido').default(''),
  description: Yup.string()
    .required('La descripcion del ingreso es requerida')
    .default(''),
});

export type TCreateIncomeFormType = Yup.InferType<typeof createIncomeSchema>;

export const createIncomeFormDefaultValues: TCreateIncomeFormType =
  createIncomeSchema.cast({});
