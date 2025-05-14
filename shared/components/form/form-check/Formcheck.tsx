import { View } from 'react-native';
import { Checkbox, CheckboxProps } from 'react-native-paper';
import { useFormControlContext } from '../form-control/FormControl';

interface IFormcheck extends Omit<CheckboxProps, "status"> {
  items: Array<{ label: string; value: string }>;
  itemsFlex?: boolean;
}

const Formcheck = (props: IFormcheck) => {
  const {
    field,
    fieldState: { error },
  } = useFormControlContext();

  const handleChange = (e: string) => {
    field.onChange(e);
  };

  return (
    <View>
      {props.items.map((item, index) => {
        return (
          <View
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', justifyContent: 'space-between', }}
          >
            <Checkbox.Item
              {...field}
              {...props}
              color={error?.message ? 'red' : 'black'}
              label={item.label}
              status={field.value === item.value ? 'checked' : 'unchecked'}
              onPress={() => handleChange(item.value)}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Formcheck;
