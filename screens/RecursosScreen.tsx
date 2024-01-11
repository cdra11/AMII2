import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

//IMAGE
import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';


export default function RecursosScreen() {
//CARGAR IMAGEN
  const [imagen, setImagen]=useState(' ')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

//SUBIR IMAGEN
  async function subirImagen(nombre:string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
        const response = await fetch(imagen);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob, {
            contentType: 'image/jpg'
        });

        console.log('La imagen se subió con éxito');

        // Obtiene la URL de la imagen
        //const imageURL = await getDownloadURL(storageRef);
        //console.log('URL de desacarga de la imagen', imageURL);
      } catch (error) {
        console.log(error);
      }
    }
    

  return (
    <View>
      <ImageBackground
      style={styles.background}
      source={{uri:'https://is.zobj.net/image-server/v1/images?r=MbxfoTmwxaWcPMXJhEvnM6aHvf7v-1IhHK_fiBdapvfIQCs0_VH0TYWWPq3q1XHl9ozNU5xDEGLUNjfAl4X7rxy2w7sqafuIKLO3IIaahXhrS-fJZNJNK5CFVyXPZacVwTiP-Febf4TLK4u05LY8zSRphXPLT6F7C4oGbB4ZeuJOpj5uvJvGr5jsty-VvBYrksxiD-VJCkx4x4A-_i5lmrvqc0wHjg9qyblMtye4KqVQ6D7anb4VEUjjM7E'}}>
      <Text style={styles.texto}> SUBIR UNA IMAGEN DESDE LA GALERIA</Text>
      <Button title='Abrir galeria' onPress={()=>pickImage()}
      color={'#b382d9' }
      />
      <Image source={{uri:imagen}} style={styles.img}/>
      <Button title='Subir imagen' onPress={ () => subirImagen('avatar1')}
      color={'#b382d9'}/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  img:{
    width:400,
    height:300,
    resizeMode:'contain',
    },

    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
  
  
    background: {
      width: 400,
      height: 850,
      resizeMode: 'cover',
    },
  
    texto:{
      fontSize:15,
      alignSelf:'center',
      fontFamily:'monospace',
      marginTop:30,
      marginBottom:30,
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