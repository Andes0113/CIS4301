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
import FundPage from './Pages/FundPage/FundPage';
import { SettingsContextProvider } from './Contexts/SettingsContext';
import CreateFund from './Pages/CreateFund/CreateFund';
import CreateTrade from './Pages/CreateTrade/CreateTrade';
import Leaderboard from './Pages/Leaderboard/Leaderboard';

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
  {
    path: '/fund/:fund_id',
    element: (
      <SettingsContextProvider>
        <FundPage />
      </SettingsContextProvider>
    ),
  },
  {
    path: '/create/fund',
    element: <CreateFund />,
  },
  {
    path: '/create/trade',
    element: <CreateTrade />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
