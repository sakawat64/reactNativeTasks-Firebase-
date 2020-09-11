import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import Create from "./src/screens/Create";
import Update from "./src/screens/Update";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import { firebase } from "./src/firebase/config.js";
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  function onAuthStateChanged(user) {
    setUser(user);
    setInitializing(false);
  }
  useEffect(() => {
    {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }
  }, []);
  if (initializing) return null;

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="Create" component={Create} />
              <Stack.Screen name="Update" component={Update} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
        <FlashMessage position="top" />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
});
