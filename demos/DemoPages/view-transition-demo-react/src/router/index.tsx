import {  createHashRouter, Navigate, RouterProvider, } from "react-router-dom";
import ErrorPage from "@/pages/404"
import Layout from "@/components/layout";
import { ROUTESMAP } from "./const";
import HomePage from "@/pages/home-page";
import DetailPage from "@/pages/detail-page";
const router: ReturnType<typeof createHashRouter> = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true, // This marks the default child route
                element: <Navigate to={ROUTESMAP.HOME} replace />,
            },
            {
                path: ROUTESMAP.HOME,
                element: <HomePage />,
            },
            {
                path: `${ROUTESMAP.DETAIL}/:id`,
                element: <DetailPage />,
            },
        ]
    }
]);


export { RouterProvider, router }