import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-elements";
import MultiSelectResult from "../components/MultiSelectResult";

import { Feather } from "@expo/vector-icons";
import cities from "../../config/cities.json";
const listResult = (list, term) => {
  let index = 0;
  term ? term : null;
  const results = list.filter(city => {
    if (
      (term == null && index <= 24) ||
      (city.name.includes(term) && index <= 24)
    ) {
      index++;
      return true;
    }
    return false;
  });

  return results;
};

const multiSelectResult = (coosen, inival) => {
  if (coosen.length > 0) {
    return <MultiSelectResult list={coosen} />;
  } else {
    return <MultiSelectResult list={inival} />;
  }
};
export default MultiSelect = ({
  isVisible,
  setIsVisible,
  list,
  selectedItems,
  showList,
  singleSelect,
  initializeValue
}) => {
  const [term, seterm] = useState("");
  const [coosen, setchossen] = useState([]);
  return (
    <View>
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.backgroundStyle}>
            <Feather name="search" style={styles.iconStyle} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder="Search"
              value={term}
              onChangeText={term => seterm(term)}
              onEndEditing={() => {}}
            />
          </View>

          <FlatList
            data={listResult(list, term)}
            keyExtractor={result => result.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    if (singleSelect) {
                      selectedItems(item.name);
                      setchossen(item.name);

                      setIsVisible(false);
                    } else if (!coosen.includes(item.name)) {
                      setchossen([...coosen, item.name]);
                    } else {
                      setchossen(coosen.filter(obj => obj != item.name));
                    }
                  }}
                >
                  <Text style={styles.title}>{item.name}</Text>
                  {coosen.includes(item.name) ? (
                    <Feather name="check" style={styles.clicked} />
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
          {singleSelect ? null : (
            <Button
              title="שמירה"
              onPress={() => {
                selectedItems(coosen);
                setIsVisible(false);
              }}
            />
          )}
        </View>
      </Modal>
      {(showList && coosen.length > 0) || initializeValue
        ? multiSelectResult(coosen, initializeValue)
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  item: {
    borderWidth: 1,
    // borderRadius: 10,
    backgroundColor: "#F0EEEE",
    padding: 5,
    marginVertical: 6,
    marginHorizontal: 16
  },
  container: {
    // alignItems: "center",
    marginTop: 50,
    // height: 50,
    // width: 200,
    backgroundColor: "white",
    borderWidth: 5,
    height: 300
  },
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10
  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15
  },
  clicked: {
    fontSize: 30,
    bottom: 10
  }
});
