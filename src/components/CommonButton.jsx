import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {commonStyles} from '../constants/commonStyles';

const CommonButton = ({title, onPress, type = 'primary'}) => {
  const buttonStyles = [
    commonStyles.button,
    type === 'primary'
      ? commonStyles.buttonPrimary
      : commonStyles.buttonSecondary,
  ];
  const textStyles = [
    type === 'primary'
      ? commonStyles.buttonTextPrimary
      : commonStyles.buttonTextSecondary,
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
