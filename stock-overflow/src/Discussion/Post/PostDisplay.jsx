import './PostDisplay.css';

function PostDisplay({ post }) {
  return (
    <div className="post-container">
      <p className="post-user">{post.user}</p>
      <p className="post-content-container">{post.content}</p>
    </div>
  );
}

export default PostDisplay;
