// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
// import { useTheme } from '../../configs/ThemeContext';
// import postsData from '../../data/posts.json';
// import categoriesData from '../../data/categories.json';
// import BackArrowIcon from '../../asserts/svg/BackArrowIcon'; 
// import ShareIcon from '../../asserts/svg/ShareIcon'; 

// const CategoryDetailScreen = ({ route, navigation }) => {
//   const { getTheme } = useTheme();
//   const theme = getTheme();
//   const { categoryId } = route.params;
//   const [posts, setPosts] = useState([]);
//   const [category, setCategory] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const filteredPosts = postsData.filter(post => post.categories.includes(categoryId));
//       setPosts(filteredPosts);

//       const selectedCategory = categoriesData.find(cat => cat.id === categoryId);
//       if (selectedCategory) {
//         setCategory(selectedCategory);
//       }
//     };

//     fetchData();
//   }, [categoryId]);

//   const renderPost = post => (
//     <View key={post.id} style={styles.postContainer}>
//       <Text style={[styles.postTitle, { color: theme.textColor }]}>{post.title.rendered}</Text>
//       {post.featured_media_url && (
//         <Image source={{ uri: post.featured_media_url }} style={styles.postImage} />
//       )}
//       <View style={styles.postInfo}>
//         <Text style={styles.postAuthor}>{post.author}</Text>
//         <Text style={styles.postDate}>{` • ${new Date(post.date).toLocaleDateString()}`}</Text>
//         <Text style={styles.postReadTime}>{` • ${post.read_time} mins read`}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackArrowIcon width={24} height={24} color={theme.textColor} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: theme.textColor }]}>{category ? category.name : 'Category'}</Text>
//         <TouchableOpacity>
//           <ShareIcon width={20} height={20} color={theme.textColor} />
//         </TouchableOpacity>
//       </View>
//       <ScrollView style={styles.content}>
//         {category && (
//           <>
//             <Text style={styles.categoryDescription}>{category.excerpt ? category.excerpt.rendered.replace(/<[^>]+>/g, '') : null}</Text>
//             <TouchableOpacity style={styles.interestButton}>
//               <Text style={styles.interestButtonText}>Interest</Text>
//             </TouchableOpacity>
//           </>
//         )}
//         {posts.map(renderPost)}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//   },
//   categoryDescription: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   interestButton: {
//     backgroundColor: '#F56200',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   interestButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   postContainer: {
//     marginBottom: 20,
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F4F4F6',
//   },
//   postTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   postInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   postAuthor: {
//     fontSize: 12,
//     color: '#777',
//   },
//   postDate: {
//     fontSize: 12,
//     color: '#777',
//   },
//   postReadTime: {
//     fontSize: 12,
//     color: '#777',
//   },
// });

// export default CategoryDetailScreen;
