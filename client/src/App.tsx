import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Password } from './containers/Password';
import { Header } from './components/Header';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/password',
      element: <Password />,
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Header />
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
