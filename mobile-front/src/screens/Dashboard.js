import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

import { FlatGrid } from 'react-native-super-grid';

export default function Dashboard({ navigation }) {

    // init ip address : 
    const ip = "http://192.168.11.151:8080";
    const [data, setData] = useState([])

    const placesData = () => {
      fetch(`${ip}/api/place/getPlace`).then(res => {
        return res.json()
      }).then(data => {
        setData(data)
      })
    }

    const test = (id, stat) => {
      //console.log(id, stat)
      fetch(`${ip}/api/place/edit/${id}`, {
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          stat : !stat
        })
      }).then(res => {
        placesData()
      })
    }

    useEffect(() => {
      placesData()
      //console.log(data)
    }, [])

  return (
    <Background>
            <BackButton goBack={navigation.goBack} />

      <ScrollView>
      <Header>PLACE LIST : 
      <Paragraph style={styles.title}>
        </Paragraph> </Header>
       
        
        <View>
          {data.map((i) => (
            <View key={i.id}>
              <Button  mode="contained"
              style={styles.btn}
              style={i.stat == false ? { backgroundColor: "#FF0000" } : {  backgroundColor: "#7FFF00" }}
              onPress={() => test(i.id, i.stat)}
              >
              {i.id}
              </Button>
            </View>
          ))}
        </View>
        <Button mode="outlined"
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  title : {
    fontSize : 500,
    textAlign : 'center',
    padding : 30,
    fontWeight: "bold"
  }
});