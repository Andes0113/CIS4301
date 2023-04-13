import { Fragment, useState } from 'react';
import './Discussion.css';
import PostDisplay from './Post/PostDisplay';
import usePosts from '../../../hooks/usePosts';

function Discussion({ selected }) {
  console.log('D', selected);
  // const [posts, setPosts] = useState([]);
  const { posts, loading } = usePosts({ ticker: selected.ticker });

  return (
    <div id="comments-container">
      {!loading &&
        posts.map((post) => (
          <Fragment key={post.id}>
            <PostDisplay post={post} />
          </Fragment>
        ))}
    </div>
  );
}

export default Discussion;
