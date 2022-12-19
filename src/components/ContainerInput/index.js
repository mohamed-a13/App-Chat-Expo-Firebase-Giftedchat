import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";

const ContainerInput = ({
  navigation,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [borderColorEmail, setBorderColorEmail] = useState("#333");
  const [borderColorPassword, setBorderColorPassword] = useState("#333");

  return (
    <View style={styles.containerInputs}>
      <TextInput
        style={[styles.input, { borderColor: borderColorEmail }]}
        placeholder="Entrer votre adresse mail"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAdress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input, { borderColor: borderColorPassword }]}
        placeholder="Entrer votre mot de passe"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.btnConnexion} onPress={handleSubmit}>
        <Text style={{ color: "white", fontSize: 20 }}>S'inscrire</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>
        Vous possedez déjà compte ?{" "}
        <Text
          style={{ color: "#63AFFF", fontWeight: "bold" }}
          onPress={() => navigation.navigate("login")}
        >
          Se connecter
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInputs: {
    width: "100%",
    height: "75%",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "80%",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  btnConnexion: {
    backgroundColor: "#63AFFF",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
});

export default ContainerInput;
