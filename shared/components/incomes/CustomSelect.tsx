import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Box from '../box/Box'

interface ICustomSelectProps {}

const CustomSelect = (props: ICustomSelectProps) => {

  
  return (
    <Box>
        <Text style={styles.title} >
          Seleccionar mes
        </Text>
    </Box>
  )
}

export default CustomSelect

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
})