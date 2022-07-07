import { Dimensions, StyleSheet, View, Text, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import MapView from 'react-native-maps';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='#fff' />
      <MapView style={styles.map} initialRegion={{
        latitude: -9.9329861,
        longitude: -67.8166505,
        latitudeDelta: 0.0940,
        longitudeDelta: 0.0421,
      }} />
      <View style={styles.modal}>
        <Text style={styles.title}>Informe a tabela de preços</Text>

        <View style={styles.combusWrapper}>
          <View style={styles.combusItem}>
            <View style={styles.header}>

              <MaterialCommunityIcons name="gas-station" size={25} color="red" />
              <TextInput style={styles.input} placeholder='R$ 0,00' keyboardType='number-pad' />

            </View>
            <Text>Gasolina</Text>
          </View>
          <View style={styles.combusItem}>
            <View style={styles.header}>

              <MaterialCommunityIcons name="gas-station" size={25} color="red" />
              <TextInput style={styles.input} placeholder='R$ 0,00' keyboardType='number-pad' />

            </View>
            <Text>Etanol</Text>
          </View>
        </View>
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
    height: Dimensions.get('screen').height * 50 / 100,
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
  },
  combusWrapper: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  combusItem: {
    width: '50%',
    height: '20%',

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
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
  }
});

