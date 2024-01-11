import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/Config';


export default function GeneralScreen() {

  const [imagen, setImagen] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Skull-Icon.svg/2048px-Skull-Icon.svg.png')

  // ABRIR LA CAMARA
  const seleccionarImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
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

  ///SUBIR LA IMAGEN
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
        const response = await fetch(imagen);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob, {
            contentType: 'image/jpg'
        });

        console.log('La imagen se subió con éxito');
        Alert.alert('Mensaje', 'Imagen subida con exito')

        // Obtiene la URL de la imagen
        const imageURL = await getDownloadURL(storageRef);
        console.log('URL de desacarga de la imagen', imageURL);

    } catch (error) {
        console.error(error);
    }
}


  return (
    <View>
      <Text style={styles.titulo}>SUBIR IMAGEN DESDE LA CAMARA</Text>
      <Button title='Abrir camara' onPress={ ()=> seleccionarImagen()}
      color={'#b382d9'}/>
      <Image source ={{ uri: imagen}} style={styles.img}/>

      <TouchableOpacity style={styles.btn} onPress={()=> subirImagen('avatar2')}>
        <Text style={styles.texto}>SUBIR IMAGEN A FIREBASE</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  img:{
    width:400,
    height:300,
    resizeMode: 'contain',
    marginTop:25,
    marginBottom:10,
  },
  btn:{
    width:'40%',
    height:50,
    backgroundColor:'#b382d9',
    alignSelf:'center',
    marginTop:20,
    marginBottom:20,
  },
  titulo:{
    textAlign:'center',
    fontSize:20,
    fontFamily:'monospace',
    marginTop:10,
    marginBottom:10,
  },

  texto:{
    fontSize:15,
    alignSelf:'center',
    fontFamily:'monospace',
  },
})