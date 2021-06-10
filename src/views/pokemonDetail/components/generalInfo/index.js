import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {isEmpty, isNil} from 'lodash';

const GeneralInfo = props => {
  const {dataPokemon, dataPokemonSpecies} = props;

  return (
    isNil(dataPokemon) === false &&
    isNil(dataPokemonSpecies) === false &&
    isEmpty(dataPokemon) === false &&
    isEmpty(dataPokemonSpecies) === false && (
      <View style={styles.container}>
        <Text style={styles.titles}>Experience:</Text>
        <Text>{dataPokemon?.base_experience}</Text>
        <Text style={styles.titles}>Habitat:</Text>
        <Text>{dataPokemonSpecies.habitat?.name}</Text>
        <Text style={styles.titles}>Weight:</Text>
        <Text>{dataPokemon?.weight}</Text>
        <Text style={styles.titles}>Height: </Text>
        <Text>{dataPokemon?.height}</Text>
      </View>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  titles: {
    paddingBottom: 10,
    paddingTop: 5,
    fontSize: 25,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});

export default GeneralInfo;
