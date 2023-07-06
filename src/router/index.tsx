import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import LandingPage from "../components/LandingPage/LandingPage";
import SignUp from "../components/SignUp/SignUp";
import ActivitiesToDo from "../components/ActivitiesToDo/ActivitiesToDo";

const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/Home',
      element: <Home />
    },
    {
      path: '/SignUp',
      element: <SignUp />
    },
    {
      path: '/ActivitiesToDo',
      element: <ActivitiesToDo />
    },
  ])

export default router