import { useEffect, useState } from 'react';

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
    setCompanies(pHolder);
    setLoading(false);
  }, []);

  return { companies, loading };
};

export default useCompanies;
