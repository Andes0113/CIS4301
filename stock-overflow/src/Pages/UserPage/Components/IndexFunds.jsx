import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFunds from '../../../hooks/useFunds';
function IndexFunds() {
  let { username } = useParams();
  const { funds, loading } = useFunds({ username });
  console.log(funds);
  return <p>{username} Funds</p>;
}

export default IndexFunds;
