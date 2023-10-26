import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Index from '@/pages/Index';
import Container from '@/pages/Container';

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Container />,
      children: [
        {

        },
        {
          path: "",
          element: <Index />,
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App;