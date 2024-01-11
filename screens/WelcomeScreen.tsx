import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
//firebase
import { getAuth, signOut } from "firebase/auth";
import LoginScreen from './LoginScreen';
export default function WelcomeScreen({navigation}: any) {

  function logOut(){

  
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
    navigation.navigate("Login");

    }

  return (
    <View>
      <ImageBackground
      style={styles.background}
      source={{uri:'https://wallpapers.ispazio.net/wp-content/uploads/2020/10/Skull-400x866.jpg'}}>
      <Text style={styles.titulo}>¡Bienveido!</Text>
      <Button title='Cerrar sesión' onPress={()=> logOut()}/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  input:{
    width:'80%',
    borderWidth:1,
    height:45,
    marginBottom:10,
    borderRadius:10,
    alignSelf:'center',
    textAlign:'center',
    
  },

  background: {
    width: 400,
    height: 850,
    resizeMode: 'cover',
  },

  texto:{
    fontSize:20,
    alignSelf:'center',
    fontFamily:'monospace',
    marginTop:10,
    marginBottom:10,
  },

  titulo:{
    fontSize:25,
    alignSelf:'center',
    fontFamily:'monospace',
    marginTop:10,
    marginBottom:10,
  },

      btn:{
      alignSelf:'center',
      borderRadius:5,
      paddingVertical:12,
      backgroundColor:'#b382d9',
      width:'50%',
      
    }

})