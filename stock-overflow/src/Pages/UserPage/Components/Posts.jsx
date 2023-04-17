import { Fragment } from 'react';
import PostDisplay from '../../StockView/Discussion/Post/PostDisplay';
import { useParams } from 'react-router-dom';
import usePosts from '../../../hooks/usePosts';

function Posts() {
  let { username } = useParams();
  const { posts, loading } = usePosts({ ticker: 'null', username });
  return (
    <div className="user-content-div">
      {!loading &&
        posts.map((post) => (
          <Fragment key={post.id}>
            <PostDisplay post={post} />
          </Fragment>
        ))}
    </div>
  );
}

export default Posts;
