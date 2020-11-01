import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  Image,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Linking from "expo-linking";

import Backdrop from "../components/Backdrop";
import FlatList from "../components/FlatList";
import Search from "../components/Search";
import Loading from "../components/Loading";
import { ButtonC, Takip } from "../components/Button";

import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [un, setUn] = useState("");
  const [data, setData] = useState([]);
  const [pp, setPp] = useState("");
  const [followers_, setFollowers] = useState("");
  const [followed_, setFollowed] = useState("");
  const [username_, setUsername] = useState("");
  const [mediacount_, setMediacoount] = useState("");
  const [biography_, setBiography] = useState("");
  const [gonderi, setGonderi] = useState("");
  const [takipci, setTakipci] = useState("");
  const [takip, setTakip] = useState("");

  const INSTA = "https://instagram.com/";

  const API = async () => {
    const { graphql } = await fetch(INSTA + un + "?__a=1").then((x) =>
      x.json()
    );

    const media = graphql.user.edge_owner_to_timeline_media.edges;
    const profile_p = graphql.user.profile_pic_url_hd;
    const followers = graphql.user.edge_followed_by.count;
    const followed = graphql.user.edge_follow.count;
    const username = graphql.user.full_name;
    const mediacount = graphql.user.edge_owner_to_timeline_media.count;
    const biography = graphql.user.biography;

    const med = media.map(({ node }) => ({
      username: node.owner.username,
      like: node.edge_liked_by.count,
      key: node.id,
      display_url: node.display_url,
    }));

    setPp(profile_p);
    setFollowers(followers);
    setFollowed(followed);
    setUsername(username);
    setBiography(biography);
    setMediacoount(mediacount);
    return med;
  };

  const scroll = useRef(new Animated.Value(0)).current;

  const apicall = async () => {
    Keyboard.dismiss();
    const data = await API();
    setUn({ value });
    <Loading />;
    setUn("");
    setGonderi("Gönderiler");
    setTakip("Takip");
    setTakipci("Takipçi");
    setData([{ key: "left" }, ...data, { key: "right" }]);
  };

  let follow = 0;
  let media = 0;
  const media1 = mediacount_;
  const media2 = media1.toString();
  const foll1 = followers_;
  const foll2 = foll1.toString();

  if (foll2.length === 9) {
    follow = foll2.substring(0, 3) + "MN";
  }
  if (foll2.length === 8) {
    follow = foll2.substring(0, 2) + "MN";
  }
  if (foll2.length === 7) {
    follow = foll2.substring(0, 1) + "MN";
  }
  if (foll2.length === 6) {
    follow = foll2.substring(0, 3) + "B";
  }
  if (foll2.length === 5) {
    follow = foll2.substring(0, 2) + "," + foll2.substring(2, 3) + "B";
  }
  if (foll2.length < 5) {
    follow = followers_;
  }
  if (media2.length === 5) {
    media = media2.substring(0, 2) + "," + media2.substring(2, 3) + "B";
  }
  if (media2.length < 5) {
    media = mediacount_;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop data={data} scroll={scroll} />
      <FlatList data={data} scroll={scroll} />
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Feather
                name="minus"
                size={44}
                color="white"
                style={styles.iconFeather}
                onPress={() => setModalVisible(false)}
              />

              <Image
                source={require("../assets/insta.jpg")}
                style={styles.instaImage}
              />
              <View
                style={{
                  backgroundColor: "yellow ",
                  justifyContent: "center",
                  height: 15,
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    alignItems: "center",
                    letterSpacing: 1,
                    fontSize: 9,
                    marginRight: 8,
                  }}
                >
                  © DESIGNED BY KERİM KESKİN
                </Text>
                <AntDesign
                  name="github"
                  size={9}
                  color="white"
                  onPress={() =>
                    Linking.openURL("https://github.com/kerimkeskin")
                  }
                />
              </View>

              <View style={styles.searchBoxContainer}>
                <Search
                  value={`${un.toString().trim()}`}
                  onChangeText={(value) => setUn(value)}
                />
                <ButtonC onPress={() => apicall()} />
              </View>
              <View style={styles.body}>
                {value === un ? (
                  <View>
                    <View style={styles.header}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: pp ? pp : null }}
                          style={styles.pp}
                        />
                      </View>

                      <View style={{ justifyContent: "center" }}>
                        <View style={styles.infContainer}>
                          <Text style={styles.mediaText}>{media}</Text>
                          <Text style={{ color: "#fff" }}>{gonderi}</Text>
                        </View>
                      </View>

                      <View style={{ justifyContent: "center" }}>
                        <View style={styles.follow}>
                          <Text style={styles.followText}>{follow}</Text>
                          <Text style={{ color: "#fff" }}>{takipci}</Text>
                        </View>
                      </View>

                      <View style={{ justifyContent: "center" }}>
                        <View style={styles.followed}>
                          <Text style={styles.followedText}>{followed_}</Text>
                          <Text style={{ color: "#fff" }}>{takip}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.username}>
                      <Text style={styles.usernameText}>{username_}</Text>
                    </View>

                    <View style={styles.biography}>
                      <Text style={styles.biographyText}>{biography_}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      {pp ? <Takip /> : null}
                    </View>
                  </View>
                ) : (
                  <Loading />
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.iconContainer}>
          <Foundation name="home" size={30} color="white" />
          <FontAwesome
            name="search"
            size={30}
            color="white"
            onPress={() => setModalVisible(true)}
          />

          <Image
            source={require("../assets/add.png")}
            style={styles.footerImage}
          />

          <AntDesign name="heart" size={28} color="white" />
          <FontAwesome5 name="user-alt" size={28} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 2.58,
    shadowRadius: 45.0,
    elevation: 24,
  },
  modal: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 70,
    padding: 15,
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: 350,
  },
  iconFeather: {
    position: "absolute",
    top: 0,
    width: 50,
    height: 36,
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    margin: 8,
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "black",
    width: "100%",
    height: 300,
  },
  header: {
    flexDirection: "row",
    marginTop: 11,
    backgroundColor: "black",
    width: 332,
    justifyContent: "space-between",
  },
  pp: {
    width: 100,
    height: 100,
    borderRadius: 400,
  },
  imageContainer: {
    flexDirection: "column",
  },
  infContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  mediaText: {
    fontWeight: "bold",
    flexDirection: "column",
    color: "#fff",
  },
  follow: {
    flexDirection: "column",
    alignItems: "center",
  },
  followText: {
    fontWeight: "bold",
    flexDirection: "column",
    color: "#fff",
  },
  followed: {
    flexDirection: "column",
    alignItems: "center",
  },
  followedText: {
    fontWeight: "bold",
    flexDirection: "column",
    color: "#fff",
  },
  username: {
    width: "100%",
    height: 28,
  },
  usernameText: {
    marginTop: 11,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  biography: {
    width: "100%",
    height: 100,
    marginTop: 6,
  },
  biographyText: {
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
  },
  footerContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#0C0C0C",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "gray",
  },
  iconContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerImage: {
    width: 122,
    height: 122,
    marginBottom: 10,
    backgroundColor: "#0C0C0C",
    borderRadius: 222,
  },
  instaImage: {
    width: 280,
    height: 85,
    marginTop: 10,
  },
});

export default HomeScreen;
