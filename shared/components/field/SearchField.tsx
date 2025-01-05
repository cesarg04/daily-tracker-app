import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Searchbar, SearchbarProps } from 'react-native-paper';

export interface ISearchFieldProps extends SearchbarProps {}

const SearchField = (props: ISearchFieldProps) => {
  const config: SearchbarProps = {
    ...props,
    style: {
      backgroundColor: 'white',
      borderRadius: 15,
      marginTop: 5,
    },
  };

  return <Searchbar {...config} />;
};

export default SearchField;

const styles = StyleSheet.create({});
