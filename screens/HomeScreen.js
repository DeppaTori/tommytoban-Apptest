import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectUser,
  selectUserFetchStatus,
  setCurrentSelectedId,
  emptyFormData,
} from "../redux/features/contactSlice";
import ContactList from "../components/ContactList";
import { NAV_FROM_HOME } from "../constants";
import { AddContactFAB } from "../components/AddContactFAB";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userFetchStatus = useAppSelector(selectUserFetchStatus);

  const contactOnClick = (id) => {
    dispatch(setCurrentSelectedId(id));
    navigation.navigate("Detail");
  };

  const gotoAddContact = () => {
    dispatch(setCurrentSelectedId(""));
    dispatch(emptyFormData());
    navigation.navigate("ContactEdit", {
      from: NAV_FROM_HOME,
      title: "Add Contact",
    });
  };

  return (
    <View>
      <ContactList contactOnClick={contactOnClick} />
      <AddContactFAB handleClick={gotoAddContact} />
    </View>
  );
};
