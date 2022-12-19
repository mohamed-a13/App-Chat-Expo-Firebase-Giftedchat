import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase";
import { ScrollView } from "react-native-gesture-handler";
import UIImage from "../../components/UIImage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [borderColorEmail, setBorderColorEmail] = useState("#333");
  const [borderColorPassword, setBorderColorPassword] = useState("#333");
  const backLogin = require("../../../assets/backLogin.png");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("login success"))
        .catch((error) => Alert.alert("Error login: ", error.message));
    } else {
      setBorderColorEmail("red");
      setBorderColorPassword("red");
      setTimeout(() => {
        setBorderColorEmail("#333");
        setBorderColorPassword("#333");
      }, 3000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <UIImage source={backLogin} />
      <View style={styles.containerInputs}>
        <TextInput
          style={[styles.input, { borderColor: borderColorEmail }]}
          placeholder="Entrer votre adresse mail"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAdress"
          autoComplete="off"
          value={email}
          onChangeText={(text) => setEmail(text)}
          // onFocus={() => setBorderColorEmail("black")}
          // onBlur={() => setBorderColorEmail("red")}
        />
        <TextInput
          style={[styles.input, { borderColor: borderColorPassword }]}
          placeholder="Entrer votre mot de passe"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          autoComplete="off"
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          // onFocus={() => setBorderColorPassword("black")}
          // onBlur={() => setBorderColorPassword("red")}
        />
        <TouchableOpacity style={styles.btnConnexion} onPress={handleLogin}>
          <Text style={{ color: "white", fontSize: 20 }}>Connexion</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>
          Vous ne possedez pas de compte ?{" "}
          <Text
            style={{ color: "#63AFFF", fontWeight: "bold" }}
            onPress={() => navigation.navigate("signup")}
          >
            S'inscrire
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerImage: {
    width: "100%",
    height: 260,
  },
  backImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
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

export default LoginScreen;
