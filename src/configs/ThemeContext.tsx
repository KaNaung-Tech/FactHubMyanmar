import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import database from '../model/database';
import Theme from '../model/Theme';

type ThemeType = 'light' | 'dark' | 'eyeProtection' | 'auto';

interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  statusBarStyle: 'dark-content' | 'light-content';
}

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: (selectedTheme: ThemeType) => Promise<void>;
  getTheme: () => ThemeConfig;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const lightTheme: ThemeConfig = {
  backgroundColor: '#FFFFFF',
  textColor: '#444655',
  statusBarStyle: 'dark-content',
};

const darkTheme: ThemeConfig = {
  backgroundColor: '#1F2027',
  textColor: '#F9F9FA',
  statusBarStyle: 'light-content',
};

const eyeProtectionTheme: ThemeConfig = {
  backgroundColor: '#FFFAE0',
  textColor: '#444655',
  statusBarStyle: 'dark-content',
};

const themes: Record<ThemeType, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
  eyeProtection: eyeProtectionTheme,
  auto: lightTheme, // default fallback theme for auto
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('auto');
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const themeCollection = database.collections.get<Theme>('themes');
        const savedTheme = await themeCollection.query().fetch();
        if (savedTheme.length > 0) {
          setTheme(savedTheme[0].theme as ThemeType);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (selectedTheme: ThemeType) => {
    try {
      console.log('Toggle Theme Called with:', selectedTheme);
      setTheme(selectedTheme);

      await database.action(async () => {
        const themeCollection = database.collections.get<Theme>('themes');
        console.log('Theme Collection:', themeCollection);

        const existingThemes = await themeCollection.query().fetch();
        console.log('Existing Themes:', existingThemes);

        if (existingThemes.length > 0) {
          console.log('Updating Existing Theme');
          const themeToUpdate = existingThemes[0];
          await themeToUpdate.update((record) => {
            (record as Theme).theme = selectedTheme;
          });
        } else {
          console.log('Creating New Theme');
          await themeCollection.create((record) => {
            (record as Theme).theme = selectedTheme;
          });
        }
      });

      console.log('Theme toggled successfully to:', selectedTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const getTheme = (): ThemeConfig => {
    if (theme === 'auto') {
      const resolvedTheme = colorScheme as ThemeType;
      return themes[resolvedTheme] || lightTheme;
    }
    return themes[theme] || lightTheme;
  };

  useEffect(() => {
    const themeConfig = getTheme();
    StatusBar.setBarStyle(themeConfig.statusBarStyle);
    StatusBar.setBackgroundColor(themeConfig.backgroundColor);
  }, [theme, colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
