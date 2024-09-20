import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card, CardProps } from 'react-native-paper'

interface IBoxProps extends CardProps {
    children: React.ReactNode
}

const Box = (props: IBoxProps) => {
  return (
    <Card style={[props.style, {padding: 20}  ]} >
        { props.children }
    </Card>
  )
}

export default Box

const styles = StyleSheet.create({})