import React from "react";
import {
  Platform,
  View,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const size = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const space = 10;
const emptysize = (width - size) / 2;

const FlatList = ({ data, scroll }) => {
  return (
    <Animated.FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.key}
      snapToInterval={size}
      horizontal
      decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
      snapToAlignment="start"
      bounces={false}
      contentContainerStyle={{ alignItems: "center" }}
      renderToHardwareTextureAndroid
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scroll } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        if (!item.display_url) {
          return <View style={{ width: emptysize }} />;
        }

        const inputRange = [
          (index - 2) * size,
          (index - 1) * size,
          index * size,
        ];

        const translateY = scroll.interpolate({
          inputRange,
          extrapolate: "clamp",
          outputRange: [100, 50, 100],
        });

        return (
          <View style={{ width: size, marginBottom: 10 }}>
            <Animated.View
              style={{
                transform: [{ translateY }],
                marginHorizontal: space,
                backgroundColor: "white",
                padding: space * 2,
                borderRadius: 34,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.display_url }}
                style={styles.posterImage}
              />
              <View style={styles.cardFooter}>
                <View style={styles.iconContainer}>
                  <AntDesign name="heart" size={24} color="red" />
                  <Image
                    source={require("../assets/comment.png")}
                    style={styles.Image}
                  />
                  <Image
                    source={require("../assets/direct.png")}
                    style={styles.Image}
                  />
                  <View style={{ width: 156, alignItems: "flex-end" }}>
                    <FontAwesome name="bookmark-o" size={24} color="black" />
                  </View>
                </View>
                <View style={styles.likeContainer}>
                  <AntDesign name="heart" size={12} color="black" />
                  <Text style={styles.like}>
                    {item.like.toString().length === 8 ? (
                      <Text>
                        {item.like.toString().substring(0, 2)} MN beğeni
                      </Text>
                    ) : null}
                    {item.like.toString().length === 7 ? (
                      <Text>
                        {item.like.toString().substring(0, 1)} MN beğeni
                      </Text>
                    ) : null}
                    {item.like.toString().length === 6 ? (
                      <Text>
                        {item.like.toString().substring(0, 3)} B beğeni
                      </Text>
                    ) : null}

                    {item.like.toString().length === 5 ? (
                      <Text>
                        {item.like.toString().substring(0, 2)},
                        {item.like.toString().substring(2, 3)} B beğeni
                      </Text>
                    ) : null}
                    {item.like.toString().length === 4 ? (
                      <Text>
                        {item.like.toString().substring(0, 1)},
                        {item.like.toString().substring(1, 4)} beğeni
                      </Text>
                    ) : null}
                    {item.like.toString().length < 4 ? (
                      <Text>{item.like.toString()} beğeni</Text>
                    ) : null}
                  </Text>
                </View>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            </Animated.View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  posterImage: {
    width: "100%",
    height: size * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    paddingVertical: 4,
    width: "100%",
    alignItems: "center",
  },
  Image: {
    width: 23,
    height: 23,
    marginLeft: 5,
  },
  likeContainer: {
    flexDirection: "row",
    marginRight: 10,
    width: "100%",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    marginTop: 5,
  },
  like: {
    marginLeft: 10,
    fontWeight: "bold",
  },
});
export default FlatList;
