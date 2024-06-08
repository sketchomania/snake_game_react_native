import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:"cyan",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Link style={{
        color:"green",
        }} href="/details">View details</Link>

      <Link style={{
        color:"blue",
        }} href="/modal">Present modal</Link>

      <Link  style={{
        color:"red",
      }} href="/notFound">Page not found</Link>
    </View>
  );
}
