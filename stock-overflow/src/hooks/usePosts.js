import { useEffect, useState } from 'react';
import axios from 'axios';

const usePosts = ({ ticker, username }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/posts?ticker=${ticker}&username=${username}`)
      .then((res) => {
        setPosts(res.data.data);
        setLoading(false);
      });
  }, [username, ticker]);

  return { posts, loading };
};

export default usePosts;
