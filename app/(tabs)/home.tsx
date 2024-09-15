import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import useModal from '@/shared/hooks/useModal'
import CustomAlertTemplate from '@/shared/components/alerts/CustomAlertTemplate'
import useAlert from '@/shared/hooks/useAlert'
import { useCreateIncome } from '@/private/modules/home/hooks/useCreateInconme'
import CreateIcomeSheet from '@/private/modules/home/components/create-income/CreateIncomeSheet'
import { SheetManager } from 'react-native-actions-sheet/dist/src/sheetmanager'

const Home = () => {

  const { createIncome } = useCreateIncome()

  useEffect(() => {
    // createIncome()
    SheetManager.show('create-income-sheet').then(res => {
      // console.log(res)
    });
  }, [])
  

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
} 

export default Home;
