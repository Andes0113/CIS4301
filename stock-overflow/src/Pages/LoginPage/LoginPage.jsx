import { useState } from 'react';
import './LoginPage.css';
import Header from '../header';
import { useAuthContext } from '../../Contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const auth = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth.setLocalUser(username);
  };

  if (auth.user) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Header />
      <div id="LoginPage">
        <div className="login-input">
          <label htmlFor="username-input">Username:</label>
          <input
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="login-input">
          <label htmlFor="password-input">Password:</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button onClick={login}>Login</button>
      </div>
    </>
  );
}

export default LoginPage;
