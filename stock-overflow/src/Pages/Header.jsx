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
        <div>
          <Link to={`/user/${auth.user}/posts`} id="profile-link">
            Profile
          </Link>

          <button id="header-login" onClick={signOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/login" id="header-login">
          Login
        </Link>
      )}
    </div>
  );
}
export default Header;
