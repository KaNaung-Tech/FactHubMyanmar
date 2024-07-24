import Search from '../asserts/svg/Search';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ theme, searchQuery, setSearchQuery }) => {
  return (
    <View style={[styles.container, { borderColor: theme.borderColor }]}>
      <Search style={styles.icon} />
      <TextInput
        style={[styles.searchBar, { backgroundColor: theme.inputBackground, color: theme.textColor }]}
        placeholder="Search..."
        placeholderTextColor={theme.textColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 32,
    padding: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});

export default SearchInput;
