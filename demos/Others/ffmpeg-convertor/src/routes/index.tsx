import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "@/pages/404";
import Layout from "@/components/Layout";
import VideoToGif from "@/pages/VideoToGif";
import VideoToVideo from "@/pages/VideoToVideo";
import { ROUTES } from "./typings";


const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.VIDEO_TO_GW,
        element: <VideoToGif />,
      },
      {
        path: ROUTES.VIDEO_TO_VIDEO,
        element: <VideoToVideo />,
      },
    ],
  },
]);
export { RouterProvider, router  };
