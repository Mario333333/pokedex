import axios_default from 'axios';
import axios from './intance';

export const getPokemons = async (offset, limit) => {
  try {
    const res = await axios.get('pokemon', {params: {offset, limit}});
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemon = async pokemon => {
  try {
    const res = await axios.get(`pokemon/${pokemon}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonSpecies = async id => {
  try {
    const res = await axios.get(`pokemon-species/${id}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonData = async url => {
  try {
    const res = await axios_default.get(url);

    return res.data;
  } catch (error) {
    throw error;
  }
};
