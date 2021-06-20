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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreenClient ({ navigation }) {

    // init ip address : 
    const ip = "http://192.168.1.178:8080";
    const [fullname, setName] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()

    const LoginStudent = async () => {
        //console.log(fullname, password)
        fetch(`${ip}/api/students/all`).then(res => {
          return res.json()
        }).then(data => {
          const dt = data.map(i => {
            if(i.fullname == fullname && i.cin == password && i.is_valid == true && i.cin != undefined) {
              return i
              //console.log(i)
              //history.push("/DashboearClient", i)
            }
          })
            if(dt.filter(Boolean).length == 1) {
              dt.map(i => {
                if(i != undefined) {
                  //console.log(i)
                  //const jsonValue = JSON.stringify(i)
                  AsyncStorage.setItem('info', JSON.stringify(i.id))
                  navigation.navigate("DashboearClient")
                }
              })
            } else {
              alert("Not Found")
            }
        })
    }

    return (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Welcome back.</Header>
          <TextInput
            label="Fullname"
            returnKeyType="next"
            onChangeText={setName}
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
          <Button mode="contained" onPress={LoginStudent}> 
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
  