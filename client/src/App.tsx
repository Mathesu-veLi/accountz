import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './containers/Dashboard';
import { EditAccount } from './containers/EditAccount';
import { Header } from './components/Header';
import { AddAccounts } from './containers/AddAccount';
import { WebsiteAccounts } from './containers/WebsiteAccounts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from './containers/Register';
import { Login } from './containers/Login';

function App() {
  const routes = [
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/account',
      element: <AddAccounts />,
    },
    {
      path: '/account/:website',
      element: <WebsiteAccounts />,
    },
    {
      path: '/account/:website/:index',
      element: <EditAccount />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer theme="dark" />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
