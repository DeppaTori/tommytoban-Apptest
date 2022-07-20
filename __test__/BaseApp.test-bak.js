import { screen, fireEvent, waitFor, act } from "@testing-library/react-native";
import { BaseApp } from "../BaseApp";
import { API_URL, MAP_DATA_TEST_ID } from "../constants";
import { renderWithProviders } from "./utils/test-utils";
import "cross-fetch/polyfill";
import { fetchResponseOk } from "../mocks/spyHelpers";
import {
  allContact,
  oneSecondContactDetail,
  oneContactDetail,
} from "../mocks/APIResponseDummy";
import { View } from "react-native";
jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("BaseApp", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockReturnValue(fetchResponseOk(allContact));
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("opens detail screen when one of the contact is pressed", async () => {
    let contactListItems;
    renderWithProviders(<BaseApp />);
    contactListItems = await screen.findAllByTestId(
      MAP_DATA_TEST_ID.CONTACT_LIST_ITEM
    );
    expect(contactListItems).toHaveLength(2);
    await act(async () => {
      fireEvent.press(contactListItems[0]);
    });

    expect(screen.queryByText(/edit contact/i)).not.toBeNull();
  });

  it("opens detail screen when second contact is pressed", async () => {
    let contactListItems;
    const fetchedContat = oneSecondContactDetail;
    global.fetch
      .mockReturnValueOnce(fetchResponseOk(allContact))
      .mockReturnValue(fetchResponseOk(fetchedContat));

    renderWithProviders(<BaseApp />);
    contactListItems = await screen.findAllByTestId(
      MAP_DATA_TEST_ID.CONTACT_LIST_ITEM
    );

    await act(async () => {
      fireEvent.press(contactListItems[1]);
    });

    expect(screen.queryByText(/edit contact/i)).not.toBeNull();

    expect(
      screen.queryByText(
        fetchedContat.data.firstName
          .concat(" ")
          .concat(fetchedContat.data.lastName)
      )
    ).not.toBeNull();

    expect(
      screen.queryByText(fetchedContat.data.age.toString())
    ).not.toBeNull();
    expect(screen.queryByText(/age/i)).not.toBeNull();
  });

  it("opens contact form when add contact floating button is pressed", async () => {
    renderWithProviders(<BaseApp />);
    await act(async () => {
      fireEvent.press(screen.getByTestId(MAP_DATA_TEST_ID.ADD_CONTACT_FAB));
    });

    expect(screen.queryByTestId(MAP_DATA_TEST_ID.SAVE_CONTACT_BTN)).tob;
  });

  it.only("renders save button on navigation bar", async () => {
    renderWithProviders(<BaseApp />);
    expect(
      await screen.findByTestId(MAP_DATA_TEST_ID.SAVE_CONTACT_BTN)
    ).not.toBeNull();
  });
});
