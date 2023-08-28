import { ContainerProvider } from "brandi-react";
import { di } from "./di-container/container";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";

import "./global.css";
import { App } from "./App";

const container = di.Register();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContainerProvider container={container}>
    <App />
  </ContainerProvider>
);
