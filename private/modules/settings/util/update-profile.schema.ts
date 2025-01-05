import * as Yup from 'yup';

export const updateProfileSchema = Yup.object().shape({
  avatar: Yup.object({
    uri: Yup.mixed().default({}),
    filePath: Yup.string().default(''),
    contentType: Yup.string().default(''),
  }),
  name: Yup.string().required().default(''),
  email: Yup.string().required().default(''),
  phoneNumber: Yup.string().default(''),
  username: Yup.string().default(''),
});

export type TUpdateProfileFormType = Yup.InferType<typeof updateProfileSchema>;
export const updateProfileFormDefaultValues: TUpdateProfileFormType =
  updateProfileSchema.getDefault();
