import React from 'react'
import ReactDOM from 'react-dom/client'


import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import {Chat} from "./components/Chat.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'




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
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path:'/login',
                element: <LoginPage/>
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
