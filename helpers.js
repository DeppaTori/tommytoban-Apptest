import { Alert } from "react-native";
import { API_URL, NAV_FROM_CONTACT_DETAIL } from "./constants";

export const saveData = (data, currentSelectedId, handleSuccessSave) => {
  const postContact = data;

  const fetchData = async () => {
    if (currentSelectedId.length > 5) {
      try {
        const { id, ...fixPostContact } = postContact;
        const response = await fetch(
          `${API_URL}/contact/${currentSelectedId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fixPostContact),
          }
        );

        const json = await response.json();

        if (response.status === 201) {
          handleSuccessSave();
        } else {
          Alert.alert(json.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    } else {
      try {
        const response = await fetch(`${API_URL}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postContact),
        });

        const json = await response.json();

        if (response.status === 201) {
          handleSuccessSave();
        } else {
          Alert.alert(json.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    }
  };

  fetchData();
  //   setLoading(true);
};
