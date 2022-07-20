import { DetailScreen } from "../../screens/DetailScreen";
import { renderWithProviders } from "../utils/test-utils";
import {
  act,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { fetchResponseOk } from "../../mocks/spyHelpers";
import {
  deleteSuccessResponse,
  oneContactDetail,
} from "../../mocks/APIResponseDummy";
import "cross-fetch/polyfill";
import { API_URL, MAP_DATA_TEST_ID } from "../../constants";
import { Alert } from "react-native";
jest.useFakeTimers();

describe("DetailScreen", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockReturnValue(fetchResponseOk(oneContactDetail));
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  const setupAndRender = async () => {
    const initialContactState = {
      currentSelectedId: oneContactDetail.data.id,
    };

    renderWithProviders(<DetailScreen />, {
      preloadedState: {
        contact: initialContactState,
      },
    });

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(MAP_DATA_TEST_ID.LOADING_INDICATOR)
    );
  };

  it("calls fetch after mounting", () => {
    setupAndRender();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenLastCalledWith(
      `${API_URL}/contact/${oneContactDetail.data.id}`
    );
  });

  it.skip("renders avatar, fullname, and age of contact", async () => {
    setupAndRender();

    expect(screen.getByTestId(MAP_DATA_TEST_ID.AVATAR_ELEMENT)).not.toBeNull();
    expect(
      screen.getByText(
        oneContactDetail.data.firstName
          .concat(" ")
          .concat(oneContactDetail.data.lastName)
      )
    ).not.toBeNull();
    expect(screen.getByText(oneContactDetail.data.age)).not.toBeNull();
    expect(screen.getByText(/age/i)).not.toBeNull();
  });

  // it("remove contact when delete contact is pressed", async () => {
  //   jest.spyOn(Alert, "alert");
  //   global.fetch
  //     .mockReturnValueOnce(fetchResponseOk(oneContactDetail))
  //     .mockReturnValue(fetchResponseOk(deleteSuccessResponse));
  //   const initialContactState = { currentSelectedId: oneContactDetail.data.id };
  //   renderWithProviders(<DetailScreen />, {
  //     preloadedState: {
  //       contact: initialContactState,
  //     },
  //   });

  //   await waitForElementToBeRemoved(() =>
  //     screen.getByTestId(MAP_DATA_TEST_ID.LOADING_INDICATOR)
  //   );

  //   expect(global.fetch).toHaveBeenLastCalledWith(
  //     `${API_URL}/contact/${oneContactDetail.data.id}`
  //   );

  //   fireEvent.press(screen.getByTestId(MAP_DATA_TEST_ID.DELETE_CONTACT_BTN));

  //   expect(Alert.alert).toHaveBeenCalledWith(
  //     "Confirmation",
  //     "Are you sure you want to delete?",
  //     expect.anything(),
  //     {
  //       cancelable: true,
  //     }
  //   );

  //   Alert.alert.mock.calls[0][2][1].onPress();

  //   expect(global.fetch).toHaveBeenLastCalledWith(
  //     `${API_URL}/contact/${oneContactDetail.data.id}`,
  //     expect.objectContaining({
  //       method: "DELETE",
  //     })
  //   );
  // });
});
