import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import HeaderComponent from '../../components/HeaderComponent';

const ContactUsScreen = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();

  const contactItems = [
    { label: 'Instagram', icon: require('../../asserts/images/instagram.png'), url: 'https://www.instagram.com' },
    { label: 'Facebook', icon: require('../../asserts/images/facebook.png'), url: 'https://www.facebook.com' },
    { label: 'Twitter', icon: require('../../asserts/images/twitter.png'), url: 'https://www.twitter.com' },
    { label: '09123456789', icon: require('../../asserts/images/phone.png'), url: 'tel:09123456789' },
  ];

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <HeaderComponent title="Contact Us" light={theme.backgroundColor} />
      {contactItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.contactItem, { backgroundColor: theme.buttonColor }]}
          onPress={() => handlePress(item.url)}
        >
          <Image source={item.icon} style={styles.icon} />
          <Text style={[styles.label, { color: theme.textColor }]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent', // Adjust the border color if needed
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default ContactUsScreen;
