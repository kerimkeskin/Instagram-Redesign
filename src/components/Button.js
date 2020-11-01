import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const Takip = () => {
  return (
    <View style={styles.TakipContainer}>
      <View>
        <TouchableOpacity style={styles.Topacity}>
          <Text style={styles.TakipText}>TakipEt</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.messageContainer}>
          <Text style={styles.messageText}>Mesaj</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.downicon}>
        <AntDesign name="down" size={13} color="white" />
      </View>
    </View>
  );
};

const ButtonC = (props) => {
  return (
    <View style={styles.ButonContainer}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          justifyContent: "center",
          width: 70,
          height: 35,
          borderRadius: 18,
          backgroundColor: "#164F0A",

          shadowColor: " #164F0A",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.58,
          shadowRadius: 6.0,

          elevation: 84,
        }}
      >
        <Text style={styles.butonText}>ARA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TakipContainer: {
    flexDirection: "row",
    width:'100%',
    justifyContent:'space-between',

  },
  Topacity: {
    backgroundColor: "#0095f6",
    width: 148,
    height: 33,
    justifyContent: "center",
    borderRadius: 8,
  },
  TakipText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  messageContainer: {
    backgroundColor: "black",
    width: 148,
    height: 33,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    borderRadius: 8,
  },
  messageText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  downicon: {
    width: 35,
    height: 33,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
  },
  ButonContainer: {
    position: "absolute",
    right: 8,
  },
  butonText: {
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
export { ButtonC };
