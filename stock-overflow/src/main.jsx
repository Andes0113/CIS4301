import React from 'react';
import ReactDOM from 'react-dom/client';
import StockView from './Pages/StockView/StockView';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';
import './index.css';
import UserPage from './Pages/UserPage/UserPage';
import Posts from './Pages/UserPage/Components/Posts';
import Trades from './Pages/UserPage/Components/Trades';
import IndexFunds from './Pages/UserPage/Components/IndexFunds';
import { AuthContextProvider } from './Contexts/AuthContext';
import LoginPage from './Pages/LoginPage/LoginPage';

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
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
