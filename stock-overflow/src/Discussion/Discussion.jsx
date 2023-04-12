import { useState } from 'react';
import './Discussion.css';
import PostDisplay from './Post/PostDisplay';

const discPHolder = [
  {
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
  {
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
  {
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
  {
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
];

function Discussion({ company }) {
  const [posts, setPosts] = useState(discPHolder);
  return (
    <div id="comments-container">
      {posts.map((post) => (
        <PostDisplay post={post} />
      ))}
    </div>
  );
}

export default Discussion;
