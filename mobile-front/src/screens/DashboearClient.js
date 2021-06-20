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
        const ip = "http://192.168.1.178:8080";
        const [data, setData] = useState([])
        const [info, setInfo] = useState("")
        //const cin = navigation.getParam('cin');
        const [selectedValue, setSelectedValue] = useState("Bike");
        // get reserved Data :
        const [reserved, setReserved] = useState([])

        // render reserved data if exist
        const getReservedData = () => {
          fetch(`${ip}/api/vih/all`).then(res => {
            return res.json()
          }).then(data => {
            setReserved(data)
          })
        }

        // render Client data
        const renderClientData = async () => {
          const data =  await AsyncStorage.getItem('info')
          setInfo(data)
        }
    
        // render availables places
        const placesData = () => {
          fetch(`${ip}/api/place/getPlace`).then(res => {
            return res.json()
          }).then(data => {
            setData(data)
          })
        }

        // unleash a place in parking
        const lessPlace = (id, PlaceId) => {
          //console.log(id, PlaceId)
          fetch(`${ip}/api/vih/delete/${id}`, {
            method : 'DELETE'
          }).then(res => {
            return res.json()
          })
          fetch(`${ip}/api/place/edit/${PlaceId}`, {
            method : 'PATCH',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              stat : false
            })
          })
          const to = ['ayyoubhalbaoui2@gmail.com'] // string or array of email addresses
          email(to, {
            subject: 'Unleash a Place :',
            body: `ID of Place Unleashed is : ${PlaceId}`
          }).catch(console.error)
          alert("Success")
          navigation.navigate('LoginScreenClient')
        }
       
        // taek a place in parking
        const takePlace = (id) => {
          //console.log(selectedValue, id, info)
          if(selectedValue == 'Bike'){
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
                fetch(`${ip}/api/place/edit/${id}`, {
                  method : 'PATCH',
                  headers : {
                    'Content-Type' : 'application/json'
                  },
                  body : JSON.stringify({
                    stat : true
                  })
                }).then(res => {
                  return res.json()
                })
                const to = ['ayyoubhalbaoui2@gmail.com'] // string or array of email addresses
                email(to, {
                    subject: 'Take a Place :',
                    body: `ID Student : ${info}, Type Vihecule : ${selectedValue}, ID Place : ${id}, Price : 3dh`
                }).catch(console.error)
                alert("Success")
                navigation.navigate('LoginScreenClient')
              } else {
                alert("Error !!!")
              }
            })
          } else {
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
                fetch(`${ip}/api/place/edit/${id}`, {
                  method : 'PATCH',
                  headers : {
                    'Content-Type' : 'application/json'
                  },
                  body : JSON.stringify({
                    stat : true
                  })
                }).then(res => {
                  return res.json()
                })
                const to = ['ayyoubhalbaoui2@gmail.com'] // string or array of email addresses
                email(to, {
                    subject: 'Student Informations :',
                    body: `ID Student : ${info}, Type Vihecule : ${selectedValue}, ID Place : ${id}, Price : 5dh`
                }).catch(console.error)
                alert("Success")
                navigation.navigate('LoginScreenClient')
              } else {
                alert("Error !!!")
              }
            })
          }
        }
        //console.log(reserved)
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
                </Picker>
                </View>
                <View>
                  {reserved != "" ? 
                    reserved.map(i => (
                    i.name == info ?
                    <View key={i.id}>
                      <Text>{i.id}</Text>
                      <Button 
                      mode="contained"
                      style={styles.btn}
                      onPress={() => lessPlace(i.id, i.PlaceId)}
                      >
                        {i.PlaceId}
                      </Button>
                      </View>
                      :
                      false
                      ))
                  :
                  data.map((i) => (
                    i.stat == false ?
                    <View key={i.id} >
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
                  ))
                  }
                </View>
                <Button
                onPress={() =>
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'StartScreen' }],
                })}
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