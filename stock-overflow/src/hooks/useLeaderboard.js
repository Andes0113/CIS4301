import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSettingsContext } from '../Contexts/SettingsContext';

const formatDate = (unformatted_date) => {
  let date = new Date(unformatted_date);
  date = date.toLocaleString('default', {
    timeZone: 'UTC',
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
  date = date.split(' ');
  date[1] = date[1].substr(0, date[1].length - 1);
  let temp = date[1];
  date[1] = date[0];
  date[0] = temp;
  date[1] = date[1].toUpperCase();
  date = date.join('-');
  return date;
};

const useLeaderboard = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start_date = formatDate(startDate);
    const end_date = formatDate(endDate);

    axios
      .get(
        `http://localhost:8000/leaderboard?start_date=${start_date}&end_date=${end_date}`
      )
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
  }, [startDate, endDate]);

  return { data, loading };
};

export default useLeaderboard;
