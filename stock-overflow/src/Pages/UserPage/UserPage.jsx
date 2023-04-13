import { useParams, Link, Outlet } from 'react-router-dom';
import './UserPage.css';

function UserPage() {
  let { username } = useParams();
  return (
    <div id="UserPage">
      <Link to="/" id="header">
        Stock Overflow
      </Link>
      <h1>{username}</h1>
      <nav id="user-nav">
        <Link className="user-nav-link" to="/">
          Home
        </Link>
        <Link className="user-nav-link" to={`/user/${username}/posts`}>
          Posts
        </Link>
        <Link className="user-nav-link" to={`/user/${username}/trades`}>
          Trades
        </Link>
        <Link className="user-nav-link" to={`/user/${username}/funds`}>
          Index Funds
        </Link>
      </nav>
      <div id="user-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default UserPage;
