import { useState } from 'react';
import './LoginPage.css';
import Header from '../header';
import { useAuthContext } from '../../Contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
function LoginPage() {
  const auth = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [send, setSend] = useState(false);
  // const { success, loading } = useLogin(username, password, send);

  const login = () => {
    setSend(true);
    axios
      .get(
        `http://localhost:8000/login?username=${username}&password=${password}`
      )
      .then((res) => {
        if (res.data.success) auth.setLocalUser(username);
      });
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
