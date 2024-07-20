import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.dark.background,
      },
      headerTitleAlign: "center",
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }}>
      <Stack.Screen
       name="index" />
    </Stack>
  );
}
