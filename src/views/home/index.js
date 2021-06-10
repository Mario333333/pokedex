import React, {useEffect} from 'react';
import {useState, useRef} from 'react';

import {StyleSheet, View, ScrollView} from 'react-native';
import {isEmpty, isNil} from 'lodash';
import {getPokemons} from '../../utils/services/api';
import DefaultLayout from '../../containers/defaultLayout';
import Pokemon from './components/pokemon';
import Finder from './components/finder';

const Home = props => {
  const {navigation} = props;
  const [currentRange, setCurrentRange] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  const scrollRef = useRef();
  const limit = 20;

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  const getInitialData = async range => {
    try {
      setCurrentRange(range + 20);
      const responsePokemons = await getPokemons(range, limit);
      if (
        isNil(responsePokemons) === false &&
        isEmpty(responsePokemons) === false
      ) {
        const {results} = responsePokemons;
        setPokemons(results);
        console.log('results', results);
        setIsBottom(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getInitialData(0);
  }, []);
  return (
    <DefaultLayout>
      {isBottom === false && (
        <ScrollView
          ref={scrollRef}
          scrollEnabled
          contentContainerStyle={{height: 1090}}
          scrollEventThrottle={400}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              getInitialData(currentRange + 20);
              setIsBottom(true);
            }
          }}>
          <Finder setPokemons={setPokemons} getInitialData={getInitialData} />
          <View style={styles.container}>
            {isNil(pokemons) === false &&
              isEmpty(pokemons) === false &&
              pokemons.map((item, index) => {
                return (
                  <Pokemon key={index} pokemon={item} navigation={navigation} />
                );
              })}
          </View>
        </ScrollView>
      )}
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    top: 5,
  },
});

export default Home;
