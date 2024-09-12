import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import useModal from '@/shared/hooks/useModal'
import CustomAlertTemplate from '@/shared/components/alerts/CustomAlertTemplate'
import useAlert from '@/shared/hooks/useAlert'
import { useCreateIncome } from '@/private/modules/home/hooks/useCreateInconme'

const Home = () => {

  const { createIncome } = useCreateIncome()

  useEffect(() => {
    createIncome()
  }, [])
  

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
} 

export default Home;
