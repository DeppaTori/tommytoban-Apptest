import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { API_URL, MAP_DATA_TEST_ID } from "../constants";
import {
  getCurrentSelectedId,
  setCurrentSelectedContact,
  setFormData,
} from "../redux/features/contactSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Avatar, Title, Text as TextPaper } from "react-native-paper";

export const DetailScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [contact, setContact] = useState({});
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(getCurrentSelectedId);

  const getContact = async () => {
    try {
      const response = await fetch(`${API_URL}/contact/${selectedId}`);
      const json = await response.json();
      setContact(json.data);
      dispatch(setFormData(json.data));
      dispatch(setCurrentSelectedContact(json.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const ContactInfo = ({ contact }) => (
    <View>
      <Avatar.Image
        size={128}
        source={{
          uri: contact.photo,
        }}
      />
      <Title>
        {contact.firstName} {contact.lastName}
      </Title>
      <TextPaper variant="labelLarge" style={styles.agetext}>
        {contact.age}
      </TextPaper>

      <TextPaper variant="labelLarge" style={styles.agelabel}>
        Age
      </TextPaper>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator testID={MAP_DATA_TEST_ID.LOADING_INDICATOR} />
      ) : (
        <ContactInfo contact={contact} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    marginLeft: 30,
  },
  agetext: {
    marginTop: 20,
    fontSize: 20,
  },
  agelabel: {
    color: "#a6a6a6",
  },
  buttonContainer: {
    bottom: -50,
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
