import { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Button, Alert } from "react-native";
import {
  API_URL,
  MAP_DATA_TEST_ID,
  NAV_FROM_CONTACT_DETAIL,
} from "../constants";
import {
  getCurrentSelectedContact,
  setSnackBarMessage,
  setRefreshContactList,
  setFormData,
} from "../redux/features/contactSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export const ContactEditScreen = ({ route, navigation }) => {
  const { from } = route.params;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setLoading] = useState(false);
  const currentSelectedContact = useAppSelector(getCurrentSelectedContact);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if contact form opened from contact detail screen
    if (from === NAV_FROM_CONTACT_DETAIL) {
      setFirstName(currentSelectedContact.firstName);
      setLastName(currentSelectedContact.lastName);
      setAge(currentSelectedContact.age);
      navigation.setOptions({ ...navigation.options, title: "Edit Contact" });
    } else {
      navigation.setOptions({ ...navigation.options, title: "Add Contact" });
    }
  }, []);

  const setFieldValue = (text, fieldName) => {
    if (fieldName === "firstName") {
      setFirstName(text);
      dispatch(setFormData({ firstName: text }));
    } else if (fieldName === "lastName") {
      setLastName(text);
      dispatch(setFormData({ lastName: text }));
    } else if (fieldName === "age") {
      setAge(text);
      dispatch(setFormData({ age: text }));
    }
  };

  const afterDeleteSuccess = () => {
    dispatch(setSnackBarMessage("Contact deleted."));
    dispatch(setRefreshContactList(true));
    navigation.navigate("Home");
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}/contact/${currentSelectedContact.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        afterDeleteSuccess();
      } else {
        Alert.alert("Something went wrong while processing your request.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const showConfirmation = () =>
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(),
          style: "delete",
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFieldValue(text, "firstName")}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setFieldValue(text, "lastName")}
        value={lastName}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Age"
        onChangeText={(text) => setFieldValue(text, "age")}
        value={age.toString()}
      />
      {from === NAV_FROM_CONTACT_DETAIL && (
        <View style={styles.trashContainer}>
          <Button
            testID={MAP_DATA_TEST_ID.DELETE_CONTACT_BTN}
            title="Delete Contact"
            onPress={showConfirmation}
            color={"red"}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  trash: {
    marginTop: 10,
  },
  trashContainer: {
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
  },
});
