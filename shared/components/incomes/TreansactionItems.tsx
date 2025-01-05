import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IPureData } from '@/shared/services/incomes/adapters/get-incomes.adapter';
import { Avatar, Tooltip } from 'react-native-paper';
import { SheetManager } from 'react-native-actions-sheet';
import Popover from 'react-native-popover-view';
import theme from '@/shared/theme/theme';
import EditIcon from '@/assets/icons/edit.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { incomesServices } from '@/shared/services/incomes/incomes.services';
import useAlert from '@/shared/hooks/useAlert';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { stylesMap } from '@/shared/constants/alerts/alerts-colors.const';

interface ITreansactionItemsProps {
  item: IPureData;
}

const TreansactionItems = (props: ITreansactionItemsProps) => {
  const { useDeleteById } = incomesServices();
  const { alert } = useAlert();
  const [isVisible, setisVisible] = useState(false);
  const { snackBar } = useSnackbar();

  const initialLetter = useMemo(
    () => props.item.description.charAt(0).toUpperCase(),
    [props.item.description]
  );

  const truncateText = useCallback(
    (text: string, maxLength: number = 10): string => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },
    []
  );

  const onSelectIncome = () => {
    SheetManager.show('detail-income-sheet', {
      payload: { id: props.item.id },
    });
  };

  const showPopover = () => {
    setisVisible(!isVisible);
  };

  const items = [
    {
      label: 'Editar',
      icon: <EditIcon width={35} height={35} color={theme.colors.primary} />,
      onPress: (event: GestureResponderEvent) => {
        setisVisible(false);
        event.stopPropagation();
        setTimeout(() => {
          SheetManager.show('edit-income-sheet', {
            payload: { id: props.item.id },
          });
        }, 1000);
      },
    },
    {
      label: 'Eliminar',
      icon: <TrashIcon width={35} height={35} color={theme.colors.error} />,
      onPress: () => {
        setisVisible(false);
        setTimeout(() => {
          alert({
            message: '¿Está seguro(a) que desea eliminar el ingreso?',
            type: 'warning',
            confirmBtnMessage: 'Aceptar',
            declineBtnMessage: 'Cancelar',
          }).then(async (res) => {
            if (res.type === 'confirm') {
              useDeleteById.mutateAsync(props.item.id).then((data) => {
                snackBar({
                  message: 'Ingreso eliminado satisfactoriamente',
                  type: 'success',
                });
              });
            }
          });
        }, 1000);
      },
    },
  ];

  return (
    <Popover
      isVisible={isVisible}
      onRequestClose={() => setisVisible(false)}
      from={
        <TouchableOpacity
          onPress={onSelectIncome}
          style={{ flex: 1 }}
          onLongPress={showPopover}
        >
          <View style={styles.container}>
            <Tooltip title={props.item.description}>
              <Text style={styles.description}>
                {truncateText(props.item.description, 20)}
              </Text>
            </Tooltip>
            <Tooltip title={props.item.amount}>
              <Text style={styles.amount}>
                {truncateText(props.item.amount)}
              </Text>
            </Tooltip>
          </View>
        </TouchableOpacity>
      }
      popoverStyle={{
        borderRadius: 10,
      }}
    >
      <View style={popoverStyles.container}>
        {items.map((item) => (
          <TouchableOpacity key={item.label} onPress={item.onPress}>
            <View style={popoverStyles.item}>
              {item.icon}
              <Text style={popoverStyles.itemText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Popover>
  );
};

export default TreansactionItems;

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  description: {
    fontSize: 25,
    fontWeight: '600',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: stylesMap.success.iconColor,
  },
});

const popoverStyles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    padding: 10,
  },
  itemText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    width: 200,
    borderRadius: 20,
    display: 'flex',
  },
});
