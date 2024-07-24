import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const BookmarkListScreen = () => {
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);

  const renderBookmark = ({ item }) => (
    <View style={styles.bookmarkItem}>
      <Text style={styles.bookmarkTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={renderBookmark}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bookmarkItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  bookmarkTitle: {
    fontSize: 16,
  },
});

export default BookmarkListScreen;
