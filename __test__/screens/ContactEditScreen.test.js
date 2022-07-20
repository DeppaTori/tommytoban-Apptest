import { ContactEditScreen } from "../../screens/ContactEditScreen";
import { renderWithProviders } from "../utils/test-utils";
import { act, fireEvent, screen } from "@testing-library/react-native";
import { fetchResponseOk } from "../../mocks/spyHelpers";
import {
  oneContactDetail,
  saveSuccessResponse,
} from "../../mocks/APIResponseDummy";
import "cross-fetch/polyfill";
import {
  API_URL,
  MAP_DATA_TEST_ID,
  NAV_FROM_CONTACT_DETAIL,
} from "../../constants";
jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("ContactEditScreen", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  const routeParams = { params: { from: "" } };
  const navigation = {
    setOptions: jest.fn(),
  };

  const setupForNavigatedFromDetailScreen = () => {
    const initialContactState = {
      currentSelectedContact: oneContactDetail.data,
    };

    renderWithProviders(
      <ContactEditScreen
        route={{ params: { from: NAV_FROM_CONTACT_DETAIL } }}
        navigation={navigation}
      />,
      {
        preloadedState: {
          contact: initialContactState,
        },
      }
    );
  };

  const setupForNavigatedFromHomeScreen = () => {
    renderWithProviders(
      <ContactEditScreen
        route={{ params: { from: "" } }}
        navigation={navigation}
      />
    );
  };

  it("renders all field in form", () => {
    renderWithProviders(
      <ContactEditScreen route={routeParams} navigation={navigation} />
    );
    expect(screen.queryByPlaceholderText(/first name/i)).not.toBeNull();
    expect(screen.queryByPlaceholderText(/last name/i)).not.toBeNull();
    expect(screen.queryByPlaceholderText(/age/i)).not.toBeNull();
  });

  it("renders contact info when navigate from detail screen", () => {
    let firstNameField, lastNameField, ageField;

    setupForNavigatedFromDetailScreen();

    firstNameField = screen.getByPlaceholderText(/first name/i);
    lastNameField = screen.getByPlaceholderText(/last name/i);
    ageField = screen.getByPlaceholderText(/age/i);

    expect(firstNameField.props.value).toBe(oneContactDetail.data.firstName);
    expect(lastNameField.props.value).toBe(oneContactDetail.data.lastName);
    expect(ageField.props.value).toBe(oneContactDetail.data.age.toString());
  });

  it("renders field value when field value is changed", async () => {
    let firstNameField, lastNameField, ageField;
    renderWithProviders(
      <ContactEditScreen route={routeParams} navigation={navigation} />
    );
    firstNameField = screen.getByPlaceholderText(/first name/i);
    lastNameField = screen.getByPlaceholderText(/last name/i);
    ageField = screen.getByPlaceholderText(/age/i);
    act(() => {
      fireEvent.changeText(firstNameField, "Tiara");
    });
    act(() => {
      fireEvent.changeText(lastNameField, "SkyWalker");
    });
    act(() => {
      fireEvent.changeText(ageField, "70");
    });

    expect(firstNameField.props.value).toBe("Tiara");
    expect(lastNameField.props.value).toBe("SkyWalker");
    expect(ageField.props.value).toBe("70");
  });

  it("renders delete contact button if navigated from detail screen", async () => {
    setupForNavigatedFromDetailScreen();

    expect(
      screen.getByTestId(MAP_DATA_TEST_ID.DELETE_CONTACT_BTN)
    ).not.toBeNull();
  });

  it("renders no delete contact button if navigated from home", async () => {
    setupForNavigatedFromHomeScreen();

    expect(
      screen.queryByTestId(MAP_DATA_TEST_ID.DELETE_CONTACT_BTN)
    ).toBeNull();
  });
});
