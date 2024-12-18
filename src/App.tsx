import './App.css'
import Login from './auth/Login'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from './auth/ForgotPassword';
import Signup from './auth/Signup';
import NewPassword from './auth/NewPassword';
import VerifyEmail from './auth/VerifyEmail';
import ObjectDetection from './ecomovetest/ObjectDetection';
import Navbar from './components/ui/Navbar';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<Navbar/>,
},

{
  path: "/test",
  element:<ObjectDetection/>,


},
{
  path: "/forgot-password",
  element:<ForgotPassword/>,


},
{
  path: "/verify-email",
  element:<VerifyEmail/>,


},
{
  path: "/reset-password",
  element:<NewPassword/>,


},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/signup",
  element:<Signup/>
},
])
function App() {

  return (
    <main>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </main>
  )
}

export default App
