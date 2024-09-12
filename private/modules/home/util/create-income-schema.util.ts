import * as Yup from "yup";

export const createIncomeSchema = Yup.object().shape({
  amount: Yup.number()
    .required("El monto es requerido")
    .nullable()
    .default(null),
  description: Yup.string()
    .required("La descripcion del ingreso es requerida")
    .default(""),
});

export type TCreateIncomeFormType = Yup.InferType<typeof createIncomeSchema>;

export const createIncomeFormDefaultValues: TCreateIncomeFormType =
createIncomeSchema.cast({});
