import { createBrowserRouter } from 'react-router-dom';

import App from "../App";
import Google from "../google/google";
import Home from "../google/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/signin/chrome/sync",
                element: <Google />,
            },
        ]
    }
]);
