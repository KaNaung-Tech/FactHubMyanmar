import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../configs/ThemeContext';

const ForYouScreen = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text>ForYouScreen</Text>
    </View>
  )
}

export default ForYouScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
});