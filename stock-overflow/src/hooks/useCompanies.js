import { useEffect, useState } from 'react';
import axios from 'axios';

const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/companies').then((res) => {
      setCompanies(res.data.data);
      setLoading(false);
    });
  }, []);

  return { companies, loading };
};

export default useCompanies;
