import { View, Image, StyleSheet } from "react-native";
import React from "react";

const UIImage = ({ source }) => {
  return (
    <View style={styles.containerImage}>
      <Image source={source} style={styles.backImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    width: "100%",
    height: 260,
  },
  backImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default UIImage;
