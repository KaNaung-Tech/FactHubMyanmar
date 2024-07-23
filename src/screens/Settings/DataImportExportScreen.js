import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ProgressBarAndroid } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import HeaderComponent from '../../components/HeaderComponent';

const DataImportExportScreen = () => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [importState, setImportState] = useState('initial'); // 'initial', 'progress', 'success'
  const [exportState, setExportState] = useState('initial'); // 'initial', 'progress', 'success'
  const [progress, setProgress] = useState(0);

  const handleImport = () => {
    setImportState('progress');
    // Simulate progress
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setImportState('success');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleExport = () => {
    setExportState('progress');
    // Simulate progress
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setExportState('success');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleReset = () => {
    setImportState('initial');
    setExportState('initial');
    setProgress(0);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <HeaderComponent title="Data Import and Export" light={theme.backgroundColor} />
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Data Import</Text>
        <Text style={[styles.sectionDescription, { color: theme.textColor }]}>
          You can import the data from other Facthub users, so you can enjoy reading our helpful articles.
        </Text>
        {importState === 'initial' && (
          <TouchableOpacity style={[styles.button, { borderColor: theme.highlightColor }]} onPress={handleImport}>
            <Image source={require('../../asserts/images/import.png')} style={styles.icon} />
            <Text style={[styles.buttonText, { color: theme.highlightColor }]}>Import data</Text>
          </TouchableOpacity>
        )}
        {importState === 'progress' && (
          <View style={[styles.progressContainer, { borderColor: theme.highlightColor }]}>
            <Text style={[styles.buttonText, { color: theme.highlightColor }]}>Importing data</Text>
            <ProgressBarAndroid styleAttr="Horizontal" color={theme.highlightColor} progress={progress / 100} indeterminate={false} />
            <Text style={[styles.progressText, { color: theme.textColor }]}>{progress}MB</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={{ color: theme.highlightColor }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {importState === 'success' && (
          <View style={[styles.successContainer, { borderColor: theme.highlightColor }]}>
            <Text style={[styles.successText, { color: theme.highlightColor }]}>Data has been imported successfully.</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={{ color: theme.highlightColor }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Data Export</Text>
        <Text style={[styles.sectionDescription, { color: theme.textColor }]}>
          You can export the data to share with other Facthub users, so they can read the valuable articles.
        </Text>
        {exportState === 'initial' && (
          <TouchableOpacity style={[styles.button, { borderColor: theme.highlightColor }]} onPress={handleExport}>
            <Image source={require('../../asserts/images/export.png')} style={styles.icon} />
            <Text style={[styles.buttonText, { color: theme.highlightColor }]}>Export data</Text>
          </TouchableOpacity>
        )}
        {exportState === 'progress' && (
          <View style={[styles.progressContainer, { borderColor: theme.highlightColor }]}>
            <Text style={[styles.buttonText, { color: theme.highlightColor }]}>Exporting data</Text>
            <ProgressBarAndroid styleAttr="Horizontal" color={theme.highlightColor} progress={progress / 100} indeterminate={false} />
            <Text style={[styles.progressText, { color: theme.textColor }]}>{progress}MB</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={{ color: theme.highlightColor }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        {exportState === 'success' && (
          <View style={[styles.successContainer, { borderColor: theme.highlightColor }]}>
            <Text style={[styles.successText, { color: theme.highlightColor }]}>Data has been exported successfully.</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={{ color: theme.highlightColor }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  progressText: {
    fontSize: 12,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  successText: {
    fontSize: 16,
  },
});

export default DataImportExportScreen;
