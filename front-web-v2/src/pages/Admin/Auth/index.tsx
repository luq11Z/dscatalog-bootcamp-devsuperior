import { ReactComponent as AuthImage } from 'assets/images/auth-image.svg';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Divulgue seus produtos no DS Catalog</h1>
        <p>
          Faça parte do nosso catálogo de divulgação e aumente a venda dos seus
          produtos.
        </p>
        <AuthImage />
      </div>

      <div className="auth-form-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
