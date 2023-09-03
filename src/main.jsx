import React from 'react'
import ReactDOM from 'react-dom/client'


import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import Chat from "./components/Chat/Chat.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "chat/?",
                element: <ChatPage />,
                errorElement: <ErrorPage/>,
                children: [
                    {
                        path: ":chatId",
                        element:<Chat/>
                    }
                ]
            },
            {
                path: `user/:userID`,
                element: <ProfilePage/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: '/register',
                element: <RegisterPage/>,
                errorElement: <ErrorPage/>,
            },
            {
                path:'/login',
                element: <LoginPage/>,
                errorElement: <ErrorPage/>,
            }

        ]
    },



]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
    <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,
)
