import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ProgressBarAndroid, // Progress bar for Android (use 'ProgressViewIOS' for iOS)
} from 'react-native';
import { useTheme } from '../../configs/ThemeContext';

const BlogScreen = ({ route }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const { post } = route.params;
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset, contentSize } = event.nativeEvent;
    const screenHeight = Dimensions.get('window').height;
    const totalScrollableHeight = contentSize.height - screenHeight;

    if (totalScrollableHeight > 0) {
      const scrollProgress = contentOffset.y / totalScrollableHeight;
      setProgress(scrollProgress);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.progressBarContainer}>
        <ProgressBarAndroid 
          styleAttr="Horizontal" 
          color={theme.textColor}
          indeterminate={false}
          progress={progress}
        />
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={[styles.title, { color: theme.textColor }]}>
          {post.title.rendered}
        </Text>
        <Text style={[styles.content, { color: theme.textColor }]}>
          {post.content.rendered} {/* Assuming HTML content, you may need to render it properly */}
        </Text>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default BlogScreen;
