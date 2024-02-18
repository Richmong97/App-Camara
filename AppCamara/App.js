import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as MediaLibrary from 'expo-media-library';
import Boton from './src/Components/Botones';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [images, setImages] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const tomarFoto = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync(); // Cambiado de tomarFotoAsync a takePictureAsync
        console.log(data);
        setImages(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (images) {
      try {
        await MediaLibrary.createAssetAsync(images);
        alert('Foto guardada con éxito ✅');
        setImages(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      {!images ? (
        <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 50 }}>
            <Ionicons
              name={type === Camera.Constants.Type.back ? 'camera-reverse' : 'camera-outline'}
              size={24}
              color="white"
              onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
              }}
            />
            <Ionicons
              name={flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'}
              size={24}
              color="white"
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: images }} style={styles.camera} />
      )}

      <View>
        {images ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
            <Boton title={'Tomar de nuevo'} icon="repeat" onPress={() => setImages(null)} />
            <Boton title={'Guardar'} icon="save" onPress={saveImage} />
          </View>
        ) : (
          <Boton title={'Tomar foto'} icon="camera" onPress={tomarFoto} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  camera: {
    flex: 1,
    borderRadius: 10,
  },
});
