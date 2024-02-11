import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './containers/Home';
import { Password } from './containers/Password';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
