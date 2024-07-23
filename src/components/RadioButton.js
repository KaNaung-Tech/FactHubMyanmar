import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ label, value, selected, onSelect, theme }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(value)} style={[styles.container, {borderColor: theme.buttonColor}]}>
      <View style={[styles.radio, { borderColor: selected ? theme.highlightColor : theme.borderColor }]}>
        {selected && <View style={[styles.radioSelected, { backgroundColor: theme.highlightColor }]} />}
      </View>
      <Text style={[styles.label, { color: selected ? theme.highlightColor : theme.textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
  },
});

export default RadioButton;
