import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

enum BetterCombustion {
  None = 1,
  Gas,
  Ethanol
}

export default function App() {
  const mapRef = useRef<MapView>(null);

  const [gasPrice, setGasPrice] = useState(0);
  const [ethanolPrice, setEthanolPrice] = useState(0);

  const [betterCombustion, setBetterCombustion] = useState(BetterCombustion.None);

  useEffect(() => {
    handleAccessLocationPermission();
  }, []);

  function handleBetterCombustion() {
    setBetterCombustion(getBetterCombustion(gasPrice, ethanolPrice))
  }

  function getBetterCombustion(gasPrice: number, ethanolPrice: number): BetterCombustion {
    console.log(gasPrice / ethanolPrice)
    return ethanolPrice / gasPrice <= 0.70 ? BetterCombustion.Ethanol : BetterCombustion.Gas
  }

  async function handleAccessLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;


    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
    handleNavigateToUserLocation(latitude, longitude);
  }

  function handleNavigateToUserLocation(latitude: number, longitude: number) {
    if (!mapRef.current) return;

    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0100,
      longitudeDelta: 0.0101,
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='#fff' />
      <MapView style={styles.map} ref={mapRef} initialRegion={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0940,
        longitudeDelta: 0.0421,
      }}
        showsUserLocation />
      <View style={styles.modal}>
        <Text style={styles.title}>Informe a tabela de preços</Text>

        <View style={styles.combusWrapper}>
          <View style={[styles.combusItem, betterCombustion === BetterCombustion.Gas && styles.betterCombustion]}>
            <View style={styles.header}>
              <MaterialCommunityIcons name="gas-station" size={25} color="red" />
              <TextInput placeholder='R$ 0,00' keyboardType='number-pad' onChangeText={value => setGasPrice(parseFloat(value))} />
            </View>
            <Text style={[betterCombustion === BetterCombustion.Gas && styles.betterCombustionText]}>Gasolina</Text>
          </View>
          <View style={[styles.combusItem, betterCombustion === BetterCombustion.Ethanol && styles.betterCombustion]}>
            <View style={styles.header}>
              <MaterialCommunityIcons name="gas-station" size={25} color="red" />
              <TextInput style={styles.input} placeholder='R$ 0,00' keyboardType='number-pad' onChangeText={value => setEthanolPrice(parseFloat(value))} />
            </View>
            <Text style={[betterCombustion === BetterCombustion.Ethanol && styles.betterCombustionText]}>Etanol</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleBetterCombustion()}>
          <Text style={styles.calcularText}>Calcular</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
    zIndex: 0
  },
  modal: {
    width: '100%',
    height: Dimensions.get('screen').height * 40 / 100,
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 15,
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    marginBottom: 10,
  },
  combusWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: '25%',
  },
  combusItem: {
    width: '50%',
    height: '100%',
    borderRadius: 7,

    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    padding: 5,
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    height: 40,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  calcularText: {
    color: '#fff',
    fontSize: 16,
  },
  betterCombustion: {
    backgroundColor: '#33f533'
  },
  betterCombustionText: {
    color: '#fff'
  }
});

