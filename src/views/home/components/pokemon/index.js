import React, {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {isEmpty, isNil} from 'lodash';
import {
  getPokemon,
  getPokemonSpecies,
  getPokemonData,
} from '../../../../utils/services/api';

const Pokemon = props => {
  const {pokemon, navigation} = props;
  const [dataPokemon, setDataPokemon] = useState(null);
  const [dataPokemonSpecies, setDataPokemonSpecies] = useState(null);
  const [dataPokemonEvolutions, setDataPokemonEvolutions] = useState([]);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [color, setColor] = useState(null);
  let evolutions = [];
  let abilities = [];

  const getChainEvolution = async chain => {
    if (isNil(chain) === false) {
      const {evolves_to} = chain;
      if (isNil(evolves_to) === false && isEmpty(evolves_to) === false) {
        const envolve = evolves_to[0];
        const evolution = envolve.species;
        const nextEnvolve = envolve.evolves_to;
        const currentEvolvePokemon = await getPokemonData(evolution.url);
        const currentEvolvePokemonURL = await getPokemonData(
          currentEvolvePokemon.varieties[0]?.pokemon?.url,
        );
        evolutions.push({...evolution, ...currentEvolvePokemonURL.sprites});
        if (isNil(nextEnvolve) === false && isEmpty(nextEnvolve) === false) {
          getChainEvolution(envolve);
        } else {
          setDataPokemonEvolutions(evolutions);
          evolutions = [];
        }
      }
    }
  };

  const getInitialData = async () => {
    try {
      const responsePokemon = await getPokemon(pokemon.name);
      const responseSpecies = await getPokemonSpecies(responsePokemon.id);
      const responseEvolution = await getPokemonData(
        responseSpecies.evolution_chain?.url,
      );
      responsePokemon.abilities.forEach(async element => {
        const responseAbility = await getPokemonData(element.ability?.url);

        const effectEn = responseAbility.effect_entries.find(
          item => item.language.name == 'en',
        );
        abilities.push({...effectEn, ...element.ability});
      });
      setPokemonAbilities(abilities);
      setColor(responseSpecies.color?.name);
      setDataPokemonSpecies(responseSpecies);
      getChainEvolution(responseEvolution.chain);

      setDataPokemon(responsePokemon);
    } catch (error) {
      console.log(error);
    }
  };

  const onPress = async () => {
    navigation.navigate('PokemonDetail', {
      dataPokemon,
      dataPokemonSpecies,
      dataPokemonEvolutions,
      color,
      pokemonAbilities,
    });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <TouchableOpacity
      style={{...styles.container, backgroundColor: color}}
      onPress={onPress}>
      {dataPokemon && (
        <>
          <Image
            style={styles.pokemonImage}
            source={{uri: dataPokemon.sprites.front_default}}
          />
          <Text>{pokemon.name}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '47%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 10,
    margin: 5,
  },
  pokemonImage: {
    width: 70,
    height: 70,
  },
});

export default Pokemon;
