import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserFunds = ({ username }) => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/funds/user?username=${username}`)
      .then((res) => {
        setFunds(res.data.data);
        setLoading(false);
      });
  }, [username]);

  return { funds, loading };
};

export default useUserFunds;
