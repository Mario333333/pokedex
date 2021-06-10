import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {isEmpty, isNil} from 'lodash';

const Evolutions = props => {
  const {dataPokemonEvolutions} = props;
  return (
    isNil(dataPokemonEvolutions) === false &&
    isEmpty(dataPokemonEvolutions) === false && (
      <View style={styles.container}>
        {dataPokemonEvolutions.map((item, index) => {
          return (
            <View key={index} style={styles.evolutionData}>
              <Text style={styles.titles}>{item?.name}</Text>
              <Image
                style={styles.pokemonEvolutionImage}
                source={{uri: item.front_default}}
              />
            </View>
          );
        })}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  titles: {
    paddingBottom: 10,
    paddingTop: 5,
    fontSize: 25,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  evolutionData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonEvolutionImage: {
    width: 150,
    height: 150,
  },
});

export default Evolutions;
