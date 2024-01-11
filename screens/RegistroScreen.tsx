import { StyleSheet, Text, View, Button, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import WelcomeScreen from '../screens/WelcomeScreen';

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen( {navigation} : any) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')


  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        navigation.navigate('Drawer_Welcome')
        
        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
       console.log(errorCode)
        if ( errorCode === 'auth/email-already-in-use'){
          Alert.alert('Error', 'El correo ingresado ya esta en uso')
        }

      });
  }

  return (
    <View>
      <ImageBackground
           style={styles.background}
           source={{uri:'https://w0.peakpx.com/wallpaper/856/180/HD-wallpaper-skull-flower-background-death-gradient-human-face-minimalist-art-minimal-design-aesthetic-pleasing-trending-popular-new-fresh-8k-high-quality-phone-ultra-pastel-colors-pink-skulls.jpg'}}>
      <Text style={styles.titulo}>Registro</Text>
      <TextInput style={styles.input}
        placeholder='Ingrese email'
        onChangeText={(texto) => setcorreo(texto)}
      />

      <TextInput style={styles.input}
        placeholder='Ingrese contrasenia'
        onChangeText={(texto) => setContrasenia(texto)}
      />

      <Button title='Registrarse' onPress={()=> registro()} color={'#b382d9'} />
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