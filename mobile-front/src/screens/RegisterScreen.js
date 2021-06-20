import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {

  // init ip address : 
  const ip = "http://192.168.1.178:8080";
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [cin, setCin] = useState("")

  const onSignUpPressed = () => {
    //console.log(name, email, password)
    fetch(`${ip}/api/students/add`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        fullname : name,
        phone : phone,
        cin : cin,
        is_valid : false
      })
    }).then(res => {
      return res.json()
    }).then(data => {
      if(data) {
        //console.log(data)
        alert("You Subscribe Successfully")
        navigation.navigate('LoginScreenClient')
      } else {
        alert("Error !!!")
      }
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account For Student</Header>
      <TextInput
        label="FullName"
        returnKeyType="next"
        value={name.value}
        onChangeText={setName}
      />
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={name.value}
        onChangeText={setPhone}
      />
      <TextInput
        label="Cin"
        returnKeyType="next"
        value={name.value}
        onChangeText={setCin}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreenClient')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
