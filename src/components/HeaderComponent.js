import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../configs/ThemeContext';
import BackArrowIcon from '../asserts/svg/BackArrowIcon';

const device = Dimensions.get('window');
const isIos = Platform.OS === 'ios';

const HeaderComponent = (props) => {
  const navigation = useNavigation();
  const { title } = props;
  const insets = useSafeAreaInsets();
  const { getTheme } = useTheme();

  const theme = getTheme();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: isIos ? insets.top : 10,
          backgroundColor: theme.backgroundColor,
        },
      ]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <BackArrowIcon width={24} height={24} stroke={theme.textColor} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: theme.textColor }]}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
//   backButton: {
//     padding: 10,
//   },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24, // same width as back button text
  },
});

export default HeaderComponent;
