import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android'; // Community Progress Bar
import RenderHtml from 'react-native-render-html';
import { useTheme } from '../../configs/ThemeContext';

// Import your custom SVG icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BlogScreen = ({ route, navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const { post } = route.params;

  const [progress, setProgress] = useState(0); // State to track the progress

  // Handle scroll event to calculate progress
  const handleScroll = (event) => {
    const { contentOffset, contentSize } = event.nativeEvent;
    const screenHeight = Dimensions.get('window').height;
    const totalScrollableHeight = contentSize.height - screenHeight;

    if (totalScrollableHeight > 0) {
      const scrollProgress = contentOffset.y / totalScrollableHeight;
      setProgress(scrollProgress);
    }
  };

  // Action to handle saving or bookmarking the post
  const handleSave = () => {
    // Add logic for saving or bookmarking the post here
    console.log('Post saved/bookmarked!');
  };

  const source = {
    html: post.content.rendered, // Assuming the HTML content is stored here
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Top Navigation Bar with Back and Save Icons */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
          <MaterialIcons name='keyboard-backspace' size={30} color={theme.textColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave} style={styles.navButton}>
        <MaterialCommunityIcons name='bookmark-plus-outline' size={30} color={theme.textColor} />

        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress}
          color={theme.textColor} // Set the color based on the theme
        />
      </View>

      {/* Scrollable Blog Content */}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16} // Throttling for smoother scroll
      >
        {/* Title */}
        <Text style={[styles.title, { color: theme.textColor }]}>
          {post.title.rendered}
        </Text>

        {/* HTML Content Rendering */}
        <RenderHtml
          contentWidth={Dimensions.get('window').width}
          source={source}
          tagsStyles={{
            body: {
              color: theme.textColor,
              fontSize: 16,
              lineHeight: 24,
            },
            a: {
              color: theme.primaryColor, // Link color
            },
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navButton: {
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
});

export default BlogScreen;
