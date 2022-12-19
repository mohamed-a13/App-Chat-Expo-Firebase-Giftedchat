import React, { useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HommeScreen = () => {
  const navigation = useNavigation();
  const logo = require("../../../assets/logo.png");
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MaterialCommunityIcons name="account-search" size={30} color="white" />
      ),
      headerRight: () => (
        <Image source={logo} style={{ width: 40, height: 40 }} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("chat")}
        style={styles.btn}
      >
        <MaterialCommunityIcons
          name="chat-processing-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 69,
      height: 72,
    },
    shadowOpacity: 0.9,
    shadowRadius: 16.0,
    backgroundColor: "#63AFFF",
    elevation: 24,
  },
});

export default HommeScreen;
