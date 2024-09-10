import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import useModal from '@/shared/hooks/useModal'
import CustomAlertTemplate from '@/shared/components/alerts/CustomAlertTemplate'

const Home = () => {

  const modal = useModal()

  useEffect(() => {
    
    modal.modal({
      template: <CustomAlertTemplate message='Alert' type='success' />
    })
  }, [])
  

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
} 

export default Home;
