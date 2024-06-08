import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details</Text>
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
