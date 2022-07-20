import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import {
  getSnackBarMessage,
  setSnackBarMessage,
} from "../redux/features/contactSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export const SnackbarContainer = () => {
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const message = useAppSelector(getSnackBarMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSnackBarVisible((prev) => (message.length > 0 ? true : false));
  }, [message]);

  useEffect(() => {
    if (!snackBarVisible) {
      dispatch(setSnackBarMessage(""));
    }
  }, [snackBarVisible]);

  return (
    <Snackbar
      style={styles.snackbar}
      visible={snackBarVisible}
      duration={2000}
      onDismiss={() => setSnackBarVisible(false)}
    >
      {message}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 10,
  },
});
