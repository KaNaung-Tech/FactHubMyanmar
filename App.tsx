import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, useTheme} from './src/configs/ThemeContext';
import MainNavigator from './src/routes/useRoutes';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/configs/i18n';
import {BookmarkProvider} from './src/context/BookmarkProvider'

const AppContent = () => {
  const {getTheme} = useTheme();
  const theme = getTheme();

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={theme.statusBarStyle}
        backgroundColor={theme.backgroundColor}
      />
      <MainNavigator />
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BookmarkProvider>
        <I18nextProvider i18n={i18n}>
          <AppContent />
        </I18nextProvider>
        </BookmarkProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
