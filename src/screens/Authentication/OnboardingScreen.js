import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import { fetchCategories } from '../../services/api';

const OnboardingScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const isButtonEnabled = selectedCategories.length >= 3;

  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBarStyle);
    StatusBar.setBackgroundColor(theme.backgroundColor);

    // Fetch categories from API
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    loadCategories();
  }, [theme]);

  const toggleCategory = category => {
    if (selectedCategories.includes(category.name)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category.name),
      );
    } else {
      setSelectedCategories([...selectedCategories, category.name]);
    }
  };

  const isCategorySelected = category => selectedCategories.includes(category.name);

  const renderCategory = category => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        isCategorySelected(category) && styles.categoryButtonSelected,
      ]}
      onPress={() => toggleCategory(category)}>
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
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
        onPress={() => navigation.navigate('MainTabs')}
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
