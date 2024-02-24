import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Password } from './containers/Password';
import { Header } from './components/Header';
import { AddPassword } from './containers/AddPassword';
import { WebsitePasswords } from './containers/WebsitePasswords';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from './containers/Register';
import { Login } from './containers/Login';

function App() {
  const routes = [
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/password',
      element: <AddPassword />,
    },
    {
      path: '/password/:website',
      element: <WebsitePasswords />,
    },
    {
      path: '/password/:website/:index',
      element: <Password />,
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
