import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Picker } from "react-native";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import email from 'react-native-email'

export default function DashboardClient ({ navigation }) {
1234
        // init ip address : 
        const ip = "http://192.168.11.151:8080";
        const [data, setData] = useState([])
        const [info, setInfo] = useState("")
        //const cin = navigation.getParam('cin');
        const [selectedValue, setSelectedValue] = useState("Bike");
        // get reserved Data :
        const [reserved, setReserved] = useState([])

        const getReservedData = () => {
          fetch(`${ip}/api/vih/all`).then(res => {
            return res.json()
          }).then(data => {
            setReserved(data)
          })
        }

        const renderClientData = async () => {
          const data =  await AsyncStorage.getItem('info')
          setInfo(data)
        }
    
        const placesData = () => {
          fetch(`${ip}/api/place/getPlace`).then(res => {
            return res.json()
          }).then(data => {
            setData(data)
          })
        }
       
        const takePlace = (id) => {
          //console.log(selectedValue, id, info)
          fetch(`${ip}/api/vih/addVih`, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              name : info,
              type : selectedValue,
              placeId : id
            })
          }).then(res => {
            return res.json()
          }).then(data => {
            if(data) {
              const to = ['ayyoubhalbaoui2@gmail.com'] //  **Admin email** string or array of email addresses
              email(to, {
                  subject: 'Student Informations :',
                  body: `ID Student : ${info}, Type Vihecule : ${selectedValue}, ID Place : ${id}`
              }).catch(console.error)
              alert("Success")
              navigation.navigate('LoginScreenClient')
            } else {
              alert("Error !!!")
            }
          })
        }
console.log(reserved)
        useEffect(() => {
            placesData()
            renderClientData()
            getReservedData()
            
        }, [])

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />

            <ScrollView>
            <Header>PLACE LIST : 
            <Paragraph style={styles.title}>
                </Paragraph>
                </Header>
                    <Text>Student_ID:  {info}</Text>
                <View>
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Bike" value="Bike" />
                  <Picker.Item label="Car" value="Car" />
                  <Picker.Item label="Bus" value="Bus" />
                </Picker>
                {data.map((i) => (
                    i.stat == false ?
                    <View key={i.id}>
                    <Button  mode="contained"
                    style={styles.btn}
                    style={{ backgroundColor: "red" }}
                    onPress={() => takePlace(i.id)}
                    >
                    {i.id}
                    </Button>
                    </View>
                    :
                    false
                ))}
                </View>
                <View>
                  <Text>Place That You Reserve : </Text>
                  {reserved.map(i => (
                    i.name == info ?
                    <View key={i.id}>
                      <Button mode="contained" style={{ backgroundColor: "#FF0000" }} style={styles.btn}>
                      {i.PlaceId}
                      </Button>
                    </View>
                    :
                    false
                  ))}
                </View>
                <Button
                onPress={() =>
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'StartScreen' }],
                })
                }
                >
                Logout
                </Button>
            </ScrollView>
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