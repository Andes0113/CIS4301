import { useEffect, useState } from 'react';
import axios from 'axios';

const pHolder = [
  {
    name: 'Apple',
    ticker: 'AAPL',
  },
  {
    name: 'Microsoft',
    ticker: 'MSFT',
  },
];

const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  let body = {};

  useEffect(() => {
    axios.get('http://localhost:8000/companies').then(res => {
      setCompanies(res.data.data)
      setLoading(false);
  });
  }, []);

  return { companies, loading };
};

export default useCompanies;
