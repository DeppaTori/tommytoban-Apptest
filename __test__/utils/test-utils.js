import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";

import { setupStore } from "../../redux/store";
import { Provider as PaperProvider } from "react-native-paper";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <PaperProvider>{children}</PaperProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
