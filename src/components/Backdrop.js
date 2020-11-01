import React from "react";
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
const size = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const backdrop = height * 0.65;

const Backdrop = ({ data, scroll }) => {
  return (
    <View style={{ height: backdrop, width, position: "absolute" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.key + "-a"}
        contentContainerStyle={{ width, height: backdrop }}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => {
          if (!item.display_url) {
            return null;
          }
          const translateX = scroll.interpolate({
            inputRange: [(index - 2) * size, (index - 1) * size],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                width: translateX,
                height,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.display_url }}
                style={{
                  width,
                  height: backdrop,
                  position: "absolute",
                }}
              />
            </Animated.View>
          );
        }}
      />

      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: backdrop,
          width,
          position: "absolute",

          bottom: 0,
        }}
      />
    </View>
  );
};
export default Backdrop;
