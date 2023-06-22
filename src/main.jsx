import React from 'react'
import ReactDOM from 'react-dom/client'


import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import ProfilePage from "./Pages/ProfilePage.jsx";
import {Chat} from "./Components/Chat.jsx";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "chat/?",
                element: <ChatPage />,
                children: [
                    {
                        path: ":chatId",
                        element:<Chat/>
                    }
                ]
            },
            {
                path: `user/:userID`,
                element: <ProfilePage/>
            }
        ]
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path:'/login',
        element: <LoginPage/>
    }


]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
    <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,
)
