import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/color';

const IconButton = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <Icon name={iconName} size={24} color={colors.primary} />
      <Text style={styles.iconButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  iconButtonText: {
    color: colors.primary,
    marginTop: 5,
  },
});

export default IconButton;
