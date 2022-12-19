import React, { useState, useLayoutEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { auth, dataBase } from "../../../Firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const navigate = useNavigation();

  const logout = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigate.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{}} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(dataBase, "whatsUp");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unSubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(dataBase, "whatsUp"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 13, marginRight: 10 }}>
          <MaterialCommunityIcons name="send" size={24} color="#63AFFF" />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
      }}
      placeholder="Message"
      timeFormat="HH:mm"
      renderSend={renderSend}
      scrollToBottom
    />
  );
};

export default ChatScreen;
