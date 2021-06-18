import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'

export default function Students ({ navigation }) {
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Parking Digital  </Header>
            <Paragraph>
                Welcome to our app.
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('LoginScreenClient')}
            >
                Login
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Register
            </Button>
        </Background>
    )
}