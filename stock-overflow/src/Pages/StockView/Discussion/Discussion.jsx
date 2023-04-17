import { Fragment, useState } from 'react';
import './Discussion.css';
import PostDisplay from './Post/PostDisplay';
import usePosts from '../../../hooks/usePosts';
import axios from 'axios';
import { useAuthContext } from '../../../Contexts/AuthContext';

function Discussion({ selected }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { posts, loading } = usePosts({
    ticker: selected[0].ticker,
    username: 'null',
  });
  const { user } = useAuthContext();

  const createPost = () => {
    axios
      .post('http://localhost:8000/posts', {
        title,
        ticker: selected[0].ticker,
        username: user,
        content,
      })
      .then(() => {
        setTitle('');
        setContent('');
      });
  };

  return (
    <>
      <h1>Discussion</h1>
      <div id="create-post">
        <div id="create-post-header">
          <input
            id="create-post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <textarea
          id="create-post-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button id="create-post-submit" onClick={createPost}>
          Submit
        </button>
      </div>
      <div id="comments-container">
        {!loading &&
          posts.map((post) => (
            <Fragment key={post.id}>
              <PostDisplay post={post} />
            </Fragment>
          ))}
      </div>
    </>
  );
}

export default Discussion;
