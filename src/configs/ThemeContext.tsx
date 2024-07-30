import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { useColorScheme, StatusBar, Platform } from 'react-native';
import database from '../model/database';
import Theme from '../model/Theme';

type ThemeType = 'light' | 'dark' | 'eyeProtection' | 'auto';

interface ThemeConfig {
  backgroundColor: string;
  textColor: string;
  statusBarStyle: 'dark-content' | 'light-content';
  buttonColor?: string;
  highlightColor?: string;
  borderColor?: string;
}
interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: (selectedTheme: ThemeType) => Promise<void>;
  getTheme: () => ThemeConfig;
  isDarkTheme: () => boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const lightTheme: ThemeConfig = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  statusBarStyle: 'dark-content',
  buttonColor: '#F4F4F6',
  highlightColor: '#FF5722',
  borderColor: '#E0E0E0',
};

const darkTheme: ThemeConfig = {
  backgroundColor: '#1F2027',
  textColor: '#F9F9FA',
  statusBarStyle: 'light-content',
  buttonColor: '#2D2F39',
  highlightColor: '#FF5722',
  borderColor: '#444455',
};

const eyeProtectionTheme: ThemeConfig = {
  backgroundColor: '#FFFAE0',
  textColor: '#444655',
  statusBarStyle: 'dark-content',
  buttonColor: '#FFFCEB',
  highlightColor: '#FF5722',
  borderColor: '#FFD700',
};

const themes: Record<ThemeType, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
  eyeProtection: eyeProtectionTheme,
  auto: lightTheme,
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
        if (!themeCollection) {
          console.error('Theme collection not found in database');
          return 'auto';
        }

        const savedThemes = await themeCollection.query().fetch();
        if (savedThemes.length > 0) {
          setTheme(savedThemes[0]?.theme as ThemeType);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
      return 'auto';
    };
    loadTheme();
  }, []);

  const toggleTheme = async (selectedTheme: ThemeType) => {
    try {
      setTheme(selectedTheme);

      const themeCollection = database.collections.get<Theme>('themes');
      if (!themeCollection) {
        console.error('Theme collection not found in database');
        return;
      }

      await database.write(async () => {
        const existingThemes = await themeCollection.query().fetch();
        if (existingThemes.length > 0) {
          await existingThemes[0].update((themeRecord) => {
            themeRecord.theme = selectedTheme;
          });
        } else {
          await themeCollection.create((themeRecord) => {
            themeRecord.theme = selectedTheme;
          });
        }
      });
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

  const isDarkTheme = (): boolean => {
    const currentTheme = theme === 'auto' ? colorScheme : theme;
    return currentTheme === 'dark';
  };

  useEffect(() => {
    const themeConfig = getTheme();
    StatusBar.setBarStyle(themeConfig.statusBarStyle);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(themeConfig.backgroundColor);
    }
  }, [theme, colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getTheme, isDarkTheme }}>
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
