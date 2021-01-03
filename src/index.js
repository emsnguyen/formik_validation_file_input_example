import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";

import "./styles.css";

import App from "./App";

// Load Material Fonts and FA icons
WebFont.load({
  google: {
    families: ["Roboto:300,500,700", "Roboto+Slab:400,700", "Material Icons"]
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
