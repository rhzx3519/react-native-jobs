import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const jobTypes = [
  { key: "Full-time", value: "FULLTIME" },
  { key: "Part-time", value: "PARTTIME" },
  { key: "Contractor", value: "CONTRACTOR" },
  { key: "Internship", value: "INTERN" },
];

const Welcome = ({ searchTerm, setSearchTerm }) => {
  const navigation = useNavigation();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adrian</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(newText) => setSearchTerm(newText)}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            navigation.push("Search", { searchTerm, activeJobType });
          }}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item.value)}
              onPress={() => {
                setActiveJobType(item.value);
              }}
            >
              <Text style={styles.tabText(activeJobType, item.value)}>{item.key}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
