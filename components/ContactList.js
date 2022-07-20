import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { API_URL, MAP_DATA_TEST_ID } from "../constants";
import { Avatar, Card, Text as TextPaper } from "react-native-paper";
import {
  getRefreshContactList,
  setRefreshContactList,
} from "../redux/features/contactSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export default ContactList = ({ contactOnClick }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch();
  const isRefreshList = useAppSelector(getRefreshContactList);

  const getContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contact`);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRefreshList) {
      getContacts();
      dispatch(setRefreshContactList(false));
    }
  }, [isRefreshList]);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator testID={MAP_DATA_TEST_ID.LOADING_INDICATOR} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableHighlight
              tesID={MAP_DATA_TEST_ID.CONTACT_LIST_CLICKABLE}
              onPress={() => contactOnClick(item.id)}
              underlayColor="white"
            >
              <Card testID={MAP_DATA_TEST_ID.CONTACT_LIST_ITEM}>
                <Card.Content style={styles.cardcontent}>
                  <Avatar.Image
                    size={48}
                    source={{
                      uri: item.photo,
                    }}
                  />
                  <TextPaper variant="labelLarge" style={styles.cardtext}>
                    {item.firstName} {item.lastName}
                  </TextPaper>
                </Card.Content>
              </Card>
            </TouchableHighlight>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardcontent: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  cardtext: {
    marginLeft: 10,
    marginTop: 10,
  },
});
