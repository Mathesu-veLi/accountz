import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Password } from './containers/Password';
import { Header } from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddPassword } from './containers/AddPassword';

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
      path: '/password/:id',
      element: <Password />,
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
