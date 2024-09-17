import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import useModal from '@/shared/hooks/useModal'
import CustomAlertTemplate from '@/shared/components/alerts/CustomAlertTemplate'
import useAlert from '@/shared/hooks/useAlert'
import { useCreateIncome } from '@/private/modules/home/hooks/useCreateInconme'
import CreateIcomeSheet from '@/private/modules/home/components/create-income/CreateIncomeSheet'
import { SheetManager } from 'react-native-actions-sheet/dist/src/sheetmanager'
import useSnackbar from '@/shared/hooks/useSnackbar'
import { Snackbar } from 'react-native-paper'

const Home = () => {

  const { createIncome } = useCreateIncome()
  const { snackBar } = useSnackbar()

  useEffect(() => {
    // createIncome()
    // SheetManager.show('create-income-sheet').then(res => {
    //   // console.log(res)
    // });

    snackBar({
      message: 'This is my first snack bar.'
    })

  }, [])
  

  return (
    <View style={styles.container} >
      <Text>Home</Text>
    </View>
  )
} 

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});