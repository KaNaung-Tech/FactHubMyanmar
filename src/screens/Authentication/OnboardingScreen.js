import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '../../configs/ThemeContext';
import {getCategories} from '../../services/api';
import {setSelectedCategories} from '../../redux/slices/categoriesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../model/database';
import OnboardingSelection from '../../model/OnboardingSelection';

const OnboardingScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategoriesState] = useState([]);
  const [error, setError] = useState(null);
  const isButtonEnabled = selectedCategories.length >= 3;
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBarStyle(theme.statusBarStyle);
    StatusBar.setBackgroundColor(theme.backgroundColor);

    const loadCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        const processedCategories = fetchedCategories.map(category => ({
          id: category.id,
          name: category.name,
        }));
        const sortedCategories = processedCategories.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
        setError('Failed to load categories. Please try again.');
      }
    };

    loadCategories();
  }, [theme]);

  const toggleCategory = category => {
    if (selectedCategories.includes(category.id)) {
      setSelectedCategoriesState(
        selectedCategories.filter(item => item !== category.id),
      );
    } else {
      setSelectedCategoriesState([...selectedCategories, category.id]);
    }
  };

  const isCategorySelected = category =>
    selectedCategories.includes(category.id);

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

  const saveOnboardingStatus = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
    } catch (error) {
      console.error('Failed to save onboarding status:', error);
    }
  };

  const saveOnboardingSelections = async () => {
    try {
      await database.write(async () => {
        await Promise.all(
          selectedCategories.map(async categoryId => {
            const category = categories.find(cat => cat.id === categoryId);
            await database.collections
              .get('onboarding_selections')
              .create(entry => {
                entry.categoryName = category.name;
                entry.createdAt = new Date();
                entry.categoryId = category.id;
              });
          }),
        );
      });
    } catch (error) {
      console.error('Error saving onboarding selections:', error);
    }
  };

  const handleNext = async () => {
    dispatch(setSelectedCategories(selectedCategories));
    await saveOnboardingSelections();
    await saveOnboardingStatus();
    navigation.navigate('MainTabs');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.title, {color: theme.textColor}]}>
        Let's know what you like
      </Text>
      <Text style={[styles.subtitle, {color: theme.textColor}]}>
        Choose three or more
      </Text>
      {error ? (
        <Text style={[styles.errorText, {color: theme.errorTextColor}]}>
          {error}
        </Text>
      ) : (
        <ScrollView
          contentContainerStyle={styles.categoryList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryContainer}>
            {categories.map(renderCategory)}
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        style={[
          styles.customButtonContainer,
          isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled,
        ]}
        onPress={handleNext}
        disabled={!isButtonEnabled}>
        <Text style={[styles.customButtonText, {color: theme.textColor}]}>
          Next
        </Text>
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
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
