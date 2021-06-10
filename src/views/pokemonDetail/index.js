import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import {isEmpty, isNil} from 'lodash';
import DefaultLayout from '../../containers/defaultLayout';
import GeneralInfo from './components/generalInfo';
import Evolutions from './components/evolutions';
import Abilities from './components/abilities';

const Home = props => {
  const {route} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisibleSection, setIsVisibleSection] = useState('');

  const {
    dataPokemon,
    dataPokemonEvolutions,
    dataPokemonSpecies,
    color,
    pokemonAbilities,
  } = route.params;

  console.log(color);

  console.log(route.params);

  return (
    <DefaultLayout>
      <ScrollView scrollEnabled>
        <View style={{...styles.container}}>
          {isNil(dataPokemon) === false && isEmpty(dataPokemon) === false && (
            <>
              <Text
                style={{
                  ...styles.titles,
                  color: color !== 'white' ? color : 'black',
                }}>
                {dataPokemon?.name}
              </Text>
              <Image
                style={{
                  ...styles.pokemonImage,
                  backgroundColor: color !== 'white' ? color : 'black',
                }}
                source={{uri: dataPokemon?.sprites?.front_default}}
              />
            </>
          )}
          <View style={styles.containerButtons}>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: color !== 'white' ? color : 'black',
              }}
              onPress={() => {
                setModalVisible(true);
                setIsVisibleSection('GENERAL_INFO');
              }}>
              <Text style={styles.textButton}>General info</Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: color !== 'white' ? color : 'black',
              }}
              onPress={() => {
                setModalVisible(true);
                setIsVisibleSection('EVOLUTIONS');
              }}>
              <Text style={styles.textButton}>Evolutions</Text>
            </Pressable>

            <Pressable
              style={{
                ...styles.button,
                backgroundColor: color !== 'white' ? color : 'black',
              }}
              onPress={() => {
                setModalVisible(true);
                setIsVisibleSection('ABILITIES');
              }}>
              <Text style={styles.textButton}>Abilities</Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View
                style={{
                  ...styles.modalView,
                  borderColor: color !== 'white' ? color : 'black',
                  borderWidth: 5,
                }}>
                {isVisibleSection === 'GENERAL_INFO' && (
                  <GeneralInfo
                    dataPokemon={dataPokemon}
                    dataPokemonSpecies={dataPokemonSpecies}
                  />
                )}
                {isVisibleSection === 'EVOLUTIONS' && (
                  <Evolutions dataPokemonEvolutions={dataPokemonEvolutions} />
                )}
                {isVisibleSection === 'ABILITIES' && (
                  <Abilities pokemonAbilities={pokemonAbilities} />
                )}

                <Pressable
                  style={{
                    ...styles.button,
                    backgroundColor: color !== 'white' ? color : 'black',
                    marginTop: 20,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textButton}>Close info</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  titles: {
    paddingBottom: 10,
    paddingTop: 5,
    fontSize: 25,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    marginTop: 300,
  },
  modalView: {
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
  },
  containerButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },

  textButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
