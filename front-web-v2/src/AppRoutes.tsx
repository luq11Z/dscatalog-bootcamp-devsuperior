import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';
import Auth from 'pages/Admin/Auth';
import Login from 'pages/Admin/Auth/Login';

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Catalog />} />
      <Route path="/products/:productId" element={<ProductDetails />} />
      <Route path="/admin/auth" element={<Navigate to="/admin/auth/login"/> } />
      <Route path="/admin/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<h1>Signup card</h1>} />
        <Route path="recover" element={<h1>Recover card</h1>} />
      </Route>
      <Route path="/admin" element={<Navigate to="/admin/products"/> } />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
