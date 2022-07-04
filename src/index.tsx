import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ClassNameGenerator.configure((componentName) => `prefix-${componentName}`);

ReactDOM.render(<App />, document.getElementById("root"));
