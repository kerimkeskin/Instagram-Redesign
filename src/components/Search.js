import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
const Search = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <EvilIcons
        name="search"
        size={24}
        color="black"
        style={{ marginLeft: 3 }}
      />
      <TextInput
        style={styles.TextInput}
        onChangeText={onChangeText}
        value={value}
        clearButtonMode="always"
        placeholder="Ara"
        placeholderTextColor="black"
        keyboardAppearance="dark"
        selectionColor="black"
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    borderRadius: 10,

    backgroundColor: "#DCD3D1",
    alignItems: "center",
    width: 230,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.58,
    shadowRadius: 0.4,
    elevation: 4,
  },
  TextInput: {
    height: 40,
    borderRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: "#DCD3D1",
    width: "100%",
  },
});
export default Search;
