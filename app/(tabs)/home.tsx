import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import useModal from '@/shared/hooks/useModal'
import CustomAlertTemplate from '@/shared/components/alerts/CustomAlertTemplate'
import useAlert from '@/shared/hooks/useAlert'

const Home = () => {

  const alert = useAlert()

  useEffect(() => {
    
    alert.alert({
      message: 'This is the message',
      type: 'error',
    })
  }, [])
  

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
} 

export default Home;
