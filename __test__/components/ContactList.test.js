import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import ContactList from "../../components/ContactList";
import "cross-fetch/polyfill";
import { fetchResponseOk } from "../../mocks/spyHelpers";
import { allContact } from "../../mocks/APIResponseDummy";
import { renderWithProviders } from "../utils/test-utils";
import { API_URL, MAP_DATA_TEST_ID } from "../../constants";
jest.useFakeTimers();

describe("ContactList", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockReturnValue(fetchResponseOk(allContact));
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("calls fetch /contacts", async () => {
    renderWithProviders(<ContactList />);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(MAP_DATA_TEST_ID.LOADING_INDICATOR)
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenLastCalledWith(`${API_URL}/contact`);
  });

  it("calls fetch  when got refresh param from redux", async () => {
    const initialContactState = {
      refreshContactList: true,
    };
    renderWithProviders(<ContactList />, {
      preloadedState: {
        contact: initialContactState,
      },
    });

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(MAP_DATA_TEST_ID.LOADING_INDICATOR)
    );

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("renders cards amount as much as contact amount", async () => {
    renderWithProviders(<ContactList />);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(MAP_DATA_TEST_ID.LOADING_INDICATOR)
    );

    expect(
      screen.getAllByTestId(MAP_DATA_TEST_ID.CONTACT_LIST_ITEM)
    ).toHaveLength(allContact.data.length);
  });

  it("renders contact names", async () => {
    renderWithProviders(<ContactList />);

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(MAP_DATA_TEST_ID.LOADING_INDICATOR)
    );

    expect(
      screen.getAllByText(
        allContact.data[0].firstName
          .concat(" ")
          .concat(allContact.data[0].lastName)
      )
    ).not.toBeNull();

    expect(
      screen.getAllByText(
        allContact.data[1].firstName
          .concat(" ")
          .concat(allContact.data[1].lastName)
      )
    ).not.toBeNull();
  });
});
