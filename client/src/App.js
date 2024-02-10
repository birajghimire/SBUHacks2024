import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import JournalPage from './pages/journal';
const router = createBrowserRouter([
  {
    path: "/",
    element:
    <>
      <LoginPage />
    </>
  },
  {
    path: "/signup",
    element:
    <>
      <SignupPage />
    </>
  },
  {
    path: "/home",
    element:
    <>
      <HomePage />
    </>
  },
  {
    path: "/test",
    element:
    <>
      <JournalPage />
    </>
  },
]);

export default function App() {
  return (
      <RouterProvider
          router={router}
      />
      
  );
}

