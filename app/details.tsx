import { Link, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {

    useFocusEffect(
    useCallback(() => {
        console.log('Hello, I am focused!');

        return () => {
        console.log('This route is now unfocused.');
        }
        }, [])
    )

  return (
    <View style={styles.container}>
      <Text>Details</Text>

      <Link style={{
        color:"blue",
        }} href="/modal">Present modal</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"yellow",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
