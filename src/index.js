//React Essentials
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

//App
import MemeWidget from "./components/memegame/MemeWidget";

//Redux
import { Provider } from "react-redux";
import { store } from "./features/configStore";

ReactDOM.render(
  <Provider store={store}>
    <MemeWidget />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
