import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {isEmpty, isNil} from 'lodash';
import {getPokemon} from '../../../../utils/services/api';

const Finder = props => {
  const {setPokemons, getInitialData} = props;

  const [namePokemon, setNamePokemon] = useState('');
  const onPress = async () => {
    getData();
  };

  const getData = async () => {
    try {
      if (isEmpty(namePokemon) === false) {
        const responsePokemon = await getPokemon(namePokemon.toLowerCase());

        if (
          isEmpty(responsePokemon) === false &&
          isNil(responsePokemon) === false
        ) {
          setPokemons([
            {
              name: responsePokemon.name,
              url: `https://pokeapi.co/api/v2/pokemon/${responsePokemon.id}/`,
            },
          ]);
        }
      }
    } catch (error) {
      Alert.alert('Pokemon no encontrado');
      setNamePokemon('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pokemon"
        style={styles.textInput}
        onChangeText={setNamePokemon}
        value={namePokemon}></TextInput>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getInitialData(0);
        }}>
        <Text style={styles.textButton}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    alignSelf: 'center',
  },
  textInput: {width: '55%', height: 50, borderBottomWidth: 2},
  button: {
    width: '20%',
    height: 30,
    backgroundColor: 'red',

    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  textButton: {
    color: 'white',
  },
});

export default Finder;
