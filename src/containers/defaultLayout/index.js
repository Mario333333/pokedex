import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

const DefaultLayout = props => {
  const {children} = props;
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    display: 'flex',
    alignSelf: 'center',
  },
});

export default DefaultLayout;
