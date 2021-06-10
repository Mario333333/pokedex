import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {isEmpty, isNil} from 'lodash';

const Abilities = props => {
  const {pokemonAbilities} = props;

  return (
    isNil(pokemonAbilities) === false &&
    isEmpty(pokemonAbilities) === false &&
    pokemonAbilities.map((item, index) => {
      return (
        <View key={index} style={styles.container}>
          <Text style={styles.titles}>{item?.name}</Text>
          <Text>{item?.effect}</Text>
        </View>
      );
    })
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin: 5,
  },
  titles: {
    paddingBottom: 10,
    paddingTop: 5,
    fontSize: 25,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});

export default Abilities;
