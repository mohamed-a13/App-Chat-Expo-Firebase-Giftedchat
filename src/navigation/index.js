import React, { useState, useEffect, createContext, useContext } from "react";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthentificationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const StackNavigattion = () => {
  return (
    <Stack.Navigator
      defaultScreenOptions={HomeScreen}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#63AFFF",
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ title: "what's bro" }}
      />
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={{ title: "what's bro" }}
      />
    </Stack.Navigator>
  );
};
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      defaultScreenOptions={LoginScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const Navi = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscride = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });
    setIsLoading(false);
    return () => unsubscride();
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <StackNavigattion /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

const Navigation = () => {
  return (
    <AuthentificationProvider>
      <Navi />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </AuthentificationProvider>
  );
};

export default Navigation;
