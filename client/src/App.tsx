import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Password } from './containers/Password';
import { Header } from './components/Header';
import { AddPassword } from './containers/AddPassword';
import { WebsitePasswords } from './containers/WebsitePasswords';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home />,
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
    }
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
