import { Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './Pages/Footer';
import Home from './Pages/Home';
import NavBar from './Pages/NavBar';
import Products from './Pages/Products';
import Login from './Shared/Login';
import NotFound from './Shared/NotFound';
import SignUp from './Shared/SignUp';

function App() {

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';

  return (
    <div>
      {!isLoginPage && !isSignUpPage ? <NavBar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isLoginPage && !isSignUpPage ? <Footer /> : null}
    </div>
  );
}

export default App;
