import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { CheckForUpdateAndAttemptToDownloadAndInstall } from "./commons/navbar/update_helper";

CheckForUpdateAndAttemptToDownloadAndInstall();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
