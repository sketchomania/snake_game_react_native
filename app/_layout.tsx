import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen 
      // options={{
      //   // Hide the header for all other routes.
      //   headerShown: false,
      // }}
       name="index" />
      <Stack.Screen options={{
        // Hide the header for all other routes.
        headerShown: false,
      }} name="details" />
      <Stack.Screen
      name="modal"
      options={{
        // Set the presentation mode to modal for our modal route.
        presentation: 'modal',
      }}
      />
    </Stack>
  );
}
