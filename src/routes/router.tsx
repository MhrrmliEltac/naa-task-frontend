import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import App from "../App";
import { ErrorBoundary } from "./ErrorBoundary";
import MediaLibrary from "../pages/MediaLibrary";
import SystemSetting from "../pages/SystemSetting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/media-library",
        element: <MediaLibrary />,
      },
      {
        path: "/system-settings",
        element: <SystemSetting />,
      },
    ],
  },
]);

export default router;
