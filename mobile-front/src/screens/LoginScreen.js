import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { useHistory } from 'react-router';
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

export default function LoginScreen({ navigation }) {

  // init ip address : 
  const ip = "http://192.168.1.178:8080";
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  // function to clear inputs :
  const clearInp = () => {
    setEmail('')
    setPassword('')
  }

  const onLoginPressed = () => {
    //console.log(email, password)
    fetch(`${ip}/api/admins/allAdmins`).then(res => {
      return res.json()
    }).then(data => {
      //console.log(data)
      data.map(i => {
        //console.log(i.password)
        if(i.email == email && i.password == password) {
          console.log("Admin Found")
          navigation.navigate("Dashboard", i)
        } else {
          console.log("Admin Not Found")
          clearInp()
        }
      })
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      {/* <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
