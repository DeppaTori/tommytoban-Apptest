import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { ContactEditScreen } from "./screens/ContactEditScreen";
import {
  setCurrentScreen,
  getFormData,
  getCurrentSelectedId,
  setSnackBarMessage,
  setRefreshContactList,
} from "./redux/features/contactSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { MAP_DATA_TEST_ID, NAV_FROM_CONTACT_DETAIL } from "./constants";
import { saveData } from "./helpers";

const Stack = createNativeStackNavigator();

export const BaseApp = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(getFormData);
  const currentSelectedId = useAppSelector(getCurrentSelectedId);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenListeners={{
          state: (e) => {
            dispatch(setCurrentScreen(e.data.state.index === 0 ? "Home" : ""));
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Contacts", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ navigation }) => ({
            title: "",

            headerRight: () => (
              <Button
                onPress={() => {
                  navigation.navigate("ContactEdit", {
                    from: NAV_FROM_CONTACT_DETAIL,
                  });
                }}
                title=""
              >
                <Icon name="edit" size={25} />
              </Button>
            ),
          })}
        />
        <Stack.Screen
          name="ContactEdit"
          options={({ navigation }) => ({
            title: "",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Button onPress={() => navigation.goBack()} title="">
                <Icon name="close" size={25} />
              </Button>
            ),
            headerRight: () => (
              <Button
                testID={MAP_DATA_TEST_ID.SAVE_CONTACT_BTN}
                onPress={() =>
                  saveData(formData, currentSelectedId, () => {
                    dispatch(setSnackBarMessage("Contact Saved."));
                    dispatch(setRefreshContactList(true));
                    navigation.navigate("Home");
                  })
                }
                title=""
              >
                <Icon name="check" size={25} />
              </Button>
            ),
          })}
          component={ContactEditScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
