import { FAB, Portal } from "react-native-paper";
import { MAP_DATA_TEST_ID } from "../constants";
import { StyleSheet } from "react-native";
import { getCurrentScreen } from "../redux/features/contactSlice";
import { useAppSelector } from "../redux/hooks";

export const AddContactFAB = ({ handleClick }) => {
  const currentScreen = useAppSelector(getCurrentScreen);

  if (currentScreen === "Home") {
    return (
      <Portal>
        <FAB
          testID={MAP_DATA_TEST_ID.ADD_CONTACT_FAB}
          icon="plus"
          style={styles.fab}
          onPress={handleClick}
        />
      </Portal>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
