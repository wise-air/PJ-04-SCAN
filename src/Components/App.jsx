import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Base from "./Base";
import Main from "./Main/Main";
import TariffPage from "./TariffPage/TariffPage";
import FaqPage from "./FaqPage/FaqPage";
import NotFound from "./NotFound/NotFound";
import LoginPage from "./LoginPage/LoginPage";
import Signin from "./LoginPage/Signin/Signin";
import Signup from "./LoginPage/Signup/Signup";

import css from './App.module.css';
import RequestPage from "./RequestPage/RequestPage";
import ResponsePage from "./ResponsePage/ResponsePage";
import LogoutPage from "./LogoutPage/LogoutPage";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Base />,
            children: [
                {
                    index: true,
                    element: <Main />,
                },
                {
                    path: "request",
                    element: <RequestPage />,
                },
                {
                    path: "response",
                    element: <ResponsePage />,
                },
                {
                    path: "tariff",
                    element: <TariffPage />,
                },
                {
                    path: "account",
                    element: <TariffPage />,
                },
                {
                    path: "faq",
                    element: <FaqPage />,
                },
                {
                    path: "signup",
                    element: <LoginPage />,
                },
                {
                    path: "login",
                    element: <LoginPage />,
                    children: [
                        {
                            index: true,
                            element: <Signin />,
                        },
                        {
                            path: "register",
                            element: <Signup />,
                        },
                    ]
                },
                {
                    path: "logout",
                    element: <LogoutPage />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                }
            ],
        },
    ]);


  return (
    <div className={css.app}>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
