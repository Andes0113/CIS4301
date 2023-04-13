import React from 'react';
import ReactDOM from 'react-dom/client';
import StockView from './Pages/StockView/StockView';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from 'react-router-dom';
import './index.css';
import UserPage from './Pages/UserPage/UserPage';
import Posts from './Pages/UserPage/Components/Posts';
import Trades from './Pages/UserPage/Components/Trades';
import IndexFunds from './Pages/UserPage/Components/IndexFunds';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StockView />,
  },
  {
    path: '/user/:username',
    element: <UserPage />,
    children: [
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'trades',
        element: <Trades />,
      },
      {
        path: 'funds',
        element: <IndexFunds />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
