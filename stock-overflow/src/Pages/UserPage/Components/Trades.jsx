import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTrades from '../../../hooks/useTrades';

function Trades() {
  let { username } = useParams();
  const { trades, loading } = useTrades({ username });
  return <p>{username} Trades</p>;
}

export default Trades;
