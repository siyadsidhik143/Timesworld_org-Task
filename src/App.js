import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login';
import "./styles/login.css"
import './styles/homepage.css'
import PrivateRouting from './components/PrivateRouting';

//new change added in study_conflict branch

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let auth = sessionStorage.getItem('auth');
    if (auth && auth === 'authenticated') {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRouting />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
