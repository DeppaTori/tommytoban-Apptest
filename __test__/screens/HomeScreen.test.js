import { HomeScreen } from "../../screens/HomeScreen";
import { renderWithProviders } from "../utils/test-utils";
import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { API_URL, MAP_DATA_TEST_ID } from "../../constants";
import { fetchResponseOk } from "../../mocks/spyHelpers";
import { allContact } from "../../mocks/APIResponseDummy";
import "cross-fetch/polyfill";
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.useFakeTimers();

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockReturnValue(fetchResponseOk(allContact));
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("render contact list", async () => {
    const contact1 = allContact.data[0];
    const contact2 = allContact.data[0];

    renderWithProviders(<HomeScreen />);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(MAP_DATA_TEST_ID.LOADING_INDICATOR)
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenLastCalledWith(`${API_URL}/contact`);

    expect(
      screen.getByText(contact1.firstName.concat(" ").concat(contact1.lastName))
    ).not.toBeNull();
    expect(
      screen.getByText(contact2.firstName.concat(" ").concat(contact2.lastName))
    ).not.toBeNull();

    expect(
      screen.getAllByTestId(MAP_DATA_TEST_ID.CONTACT_LIST_ITEM)
    ).toHaveLength(allContact.data.length);
  });
});
