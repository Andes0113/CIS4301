import { Link } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';

function Header() {
  const auth = useAuthContext();
  const signOut = () => {
    auth.setLocalUser(null);
  };
  return (
    <div id="header">
      <Link to="/" id="logo">
        Stock Overflow
      </Link>
      {auth.user ? (
        <button id="header-login" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <Link to="/login" id="header-login">
          Login
        </Link>
      )}
    </div>
  );
}
export default Header;
