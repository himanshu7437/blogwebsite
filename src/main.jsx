import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router'
import { AuthLayout, Login } from './components/index.js'
import Home from './pages/Home.jsx'

import Signup from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import MyPosts from './pages/MyPosts.jsx'
import Post from './pages/Post.jsx'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import {VerifyEmail} from './components/index.js'
import {VerifyEmailHandler} from './components/index.js'
import About from './pages/AboutPage.jsx'
import Contact from './pages/ContactPage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/my-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <MyPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/edit-profile",
            element: (
                <AuthLayout authentication>
                <EditProfile />
              </AuthLayout>
            ),
        },
        {
            path: "/profile/:username",
            element: (
                <Profile />
            ),
        },
        // verify emil
        {
            path: "/verify-email",
            element: (
                <AuthLayout authentication={false}>
                    <VerifyEmail />
                </AuthLayout>
            ),
        },
        {
            path: "/verify",
            element: (
                <VerifyEmailHandler />
            ),
        },

        // footer pages
        {
            path: "/about",
            element: (
                <About />
            ),
        },
        {
            path: "/contact",
            element: (
                <Contact />
            ),
        },
        // Add 404 handler
      {
        path: "*",
        element: (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl">404 - Page Not Found</h1>
          </div>
        )
      }
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
