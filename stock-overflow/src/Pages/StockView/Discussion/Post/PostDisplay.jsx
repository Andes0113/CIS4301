import './PostDisplay.css';
import { Link } from 'react-router-dom';

function PostDisplay({ post }) {
  return (
    <div className="post-container">
      <Link to={`/user/${post.user}/posts`}>
        <p className="post-user">{post.user}</p>
      </Link>
      {post.ticker}
      <p className="post-content-container">{post.content}</p>
    </div>
  );
}

export default PostDisplay;
