import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen ({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Parking Digital  </Header>
      <Paragraph>
        Welcome to our app.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Administrator Space
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Students')}
      >
        Student Space
      </Button>
    </Background>
  )
}