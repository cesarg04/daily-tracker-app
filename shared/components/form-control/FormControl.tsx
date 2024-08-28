import { createContext, useContext } from "react";
import {
  FieldValues,
  useController,
  UseControllerReturn,
} from "react-hook-form";

const FormControlContext = createContext<
  UseControllerReturn<FieldValues, string>
>({} as UseControllerReturn<FieldValues, string>);

interface FormControlProps {
  children: React.ReactNode;
  name: string;
}

function FormControl({ children, name }: FormControlProps) {
  const controller = useController({ name });
  return (
    <FormControlContext.Provider value={controller} key={name}>
      {children}
    </FormControlContext.Provider>
  );
}

export function useFormControlContext() {
  const values = useContext(FormControlContext);
  if (!values?.field?.name) {
    throw new Error("You did not provided a name to the form control");
  }

  return values;
}

export default FormControl;