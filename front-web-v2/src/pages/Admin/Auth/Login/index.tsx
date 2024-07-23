import { Link, useHistory } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { getTokenData, requestBackedLogin, saveAuthData } from 'util/requests';
import { useContext, useState } from 'react';
import { AuthContext } from 'AuthContext';

import './styles.scss';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>();

  const history = useHistory();

  const onSubmit = (formData: FormData) => {
    requestBackedLogin(formData)
      .then((response) => {
        setHasError(false);
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData()  
        });
        history.push('/admin');
      })
      .catch((error) => setHasError(true));
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">
            Erro ao tentar efetuar o login
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2'>
          <input
            {...register('username', {
                required: 'Campo obrigatório',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                }
            })}
            type="text"
            className={`form-control base-input form-custom-bg ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />
        </div>
        <div className={hasError ? 'mb-4' : 'mb-4 invalid-feedback d-block'}>{errors.username?.message}</div>

        <div className="mb-2">
          <input
            {...register('password', {
                required: 'Campo obrigatório'
            })}
            type="password"
            className={`form-control base-input form-custom-bg ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            name="password"
          />
        </div>
        <div className={hasError ? 'mb-2' : 'mb-2 invalid-feedback d-block'}>{errors.password?.message}</div>

        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
