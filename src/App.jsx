import { Toaster } from 'react-hot-toast';
import AuthFlow from './components/AuthFlow';
import CourseDetails from './components/CourseDetails';
import Navbar from './components/Navbar';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <AuthFlow />
        </>
      )
    },
    {
      path: "/courses",
      element: (
        <>
          <Navbar />
          <Courses />
        </>
      )
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar />
          <Dashboard />
        </>
      )
    },
    {
      path: "/courses/:courseId",
      element: (
        <>
          <Navbar/>
          <CourseDetails/>
        </>
      )
    },
    {
      path: "*",
      element: (
        <div className='w-full min-h-screen flex justify-center items-center'>
          <p className='text-6xl'>
            Dang! Not Found
          </p>
        </div>
      )
    }
  ]);

  return (
          
    <main className='relative overflow-y-scroll bg-neutral-900 min-h-screen w-screen'>

      <RouterProvider router={router}>

          {/* No need to render Navbar here as it's wrapped in each route element */}

      </RouterProvider>
    </main>
  );
}

export default App;
