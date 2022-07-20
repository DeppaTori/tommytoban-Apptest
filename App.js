import { BaseApp } from "./BaseApp";
import { setupStore } from "./redux/store";
import { Provider } from "react-redux";
import { SnackbarContainer } from "./components/SnackbarContainer";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <Provider store={setupStore()}>
      <PaperProvider>
        <SnackbarContainer />
        <BaseApp />
      </PaperProvider>
    </Provider>
  );
}
