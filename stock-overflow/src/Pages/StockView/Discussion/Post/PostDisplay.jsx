import './PostDisplay.css';
import { Link } from 'react-router-dom';

function PostDisplay({ post }) {
  return (
    <div className="post-container">
      <Link to={`/user/${post.username}/posts`}>
        <p className="post-user">{post.username}</p>
      </Link>
      <p className="post-user">{post.title}</p>
      {post.ticker}
      <p className="post-content-container">{post.content}</p>
    </div>
  );
}

export default PostDisplay;
