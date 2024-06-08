import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useTheme} from '../../configs/ThemeContext';

const categories = [
  'Article',
  'Analysis',
  'Astronomy',
  'Astrophotographing',
  'Chemistry',
  'Classic Children’s Literature',
  'Cosmos',
  'Did You Know',
  'Editorial',
  'Environmental',
  'Evolution',
  'Fact Check',
  'False News',
  'First Language Acquisition',
  'Geography',
  'General Science',
  'Health',
  'History',
  'How things work',
  'How to',
  'Impulse Momentum',
  'Linguistics',
  'Literature',
  'Literature Review',
  'Mathematics',
  'Media Information Literacy',
  'Medical',
  'Misleading',
  'Myth',
  'News',
  'Nostalgia',
  'On this day',
  'Philosophy',
  'Myanmar',
  'English',
];

const OnboardingScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();

  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBarStyle);
    StatusBar.setBackgroundColor(theme.backgroundColor);
  }, [theme]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const isButtonEnabled = selectedCategories.length >= 3;

  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isCategorySelected = category => selectedCategories.includes(category);

  const renderCategory = category => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        isCategorySelected(category) && styles.categoryButtonSelected,
      ]}
      onPress={() => toggleCategory(category)}>
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Let's know what you like</Text>
      <Text style={[styles.subtitle, { color: theme.textColor }]}>Choose three or more</Text>
      <ScrollView
        contentContainerStyle={styles.categoryList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {categories.map(renderCategory)}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.customButtonContainer,
          isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
        onPress={() => navigation.navigate('Home')}
        disabled={!isButtonEnabled}>
        <Text style={[styles.customButtonText, { color: theme.textColor }]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  categoryList: {
    flexGrow: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  categoryButtonSelected: {
    backgroundColor: '#F56200',
  },
  categoryText: {
    fontSize: 16,
  },
  customButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonEnabled: {
    backgroundColor: '#F56200',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  customButtonText: {
    fontSize: 16,
  },
});

export default OnboardingScreen;
