import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { store, persistor } from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

interface Props {}
interface State {}

// Provider Component
// -----------------
// Used for Redux for state management

// PersitGate Component
// ---------------------
// Used for Redux-persist for persisting data between browser reloads
// See store/configureStore for more info

class App extends Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
