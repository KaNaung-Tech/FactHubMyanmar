// OnboardingScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../configs/ThemeContext';
import { getCategories } from '../../services/api';
import { setSelectedCategories } from '../../redux/slices/categoriesSlice';

const OnboardingScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategoriesState] = useState([]);
  const isButtonEnabled = selectedCategories.length >= 3;
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBarStyle);
    StatusBar.setBackgroundColor(theme.backgroundColor);

    const loadCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        console.log('Fetched Categories:', fetchedCategories);

        const processedCategories = fetchedCategories.map(category => ({
          id: category.id, // Ensure id is a string
          name: category.name, // Ensure name is a string and handle empty names
        }));

        const sortedCategories = processedCategories.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, [theme]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category.name)) {
      setSelectedCategoriesState(
        selectedCategories.filter((item) => item !== category.name),
      );
    } else {
      setSelectedCategoriesState([...selectedCategories, category.name]);
    }
  };

  const isCategorySelected = (category) => selectedCategories.includes(category.name);

  const renderCategory = (category) => (
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

  const handleNext = () => {
    dispatch(setSelectedCategories(selectedCategories));
    navigation.navigate('MainTabs');
  };

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
        onPress={handleNext}
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
