//React Essentials
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

//App
import MemeWidget from "./components/memegame/MemeWidget";
import App from "./components/app/App";

//Redux
import { Provider } from "react-redux";
import { store } from "./features/configStore";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
