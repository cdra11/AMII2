import { Alert, Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function LoginScreen({navigation}: any) {

const [correo, setCorreo] = useState('')
const [contrasenia, setContrasenia] = useState('')

function login(){
  signInWithEmailAndPassword(auth, correo, contrasenia)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    navigation.navigate('Drawer_Welcome')


    console.log(user);

    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage)

    switch (errorCode) {
      case 'auth/invalid-credential':
        Alert.alert('Error', 'Las credenciales son incorrectas');
        break;

      case 'auth/missing-password':
        Alert.alert('Error', 'La contraseña no se ha enviado');
        break;

      default:
        Alert.alert(errorCode, errorMessage);
        break;
    }
});


  
}

  return (
    <View>
      <ImageBackground
      style={styles.background}
      source={{uri:'https://w0.peakpx.com/wallpaper/640/338/HD-wallpaper-aesthetic-blue-green-pink-rainbow-skull-trippy-yellow-thumbnail.jpg'}}>
      
      <Text style={styles.titulo}>Login</Text>
      <TextInput style={styles.input}
        placeholder='Ingrese correo'
        onChangeText={ (texto)=> setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput style={styles.input}
        placeholder='Ingresar contraseña'
        onChangeText={ (texto)=> setContrasenia(texto)}
      />

      <TouchableOpacity  style={styles.btn} onPress={()=> login()}>
      <Text style={styles.texto}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.texto} onPress={()=> navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
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