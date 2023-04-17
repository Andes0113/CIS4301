import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUserFunds from '../../../hooks/useUserFunds';
function IndexFunds() {
  let { username } = useParams();
  const { funds, loading } = useUserFunds({ username });

  return (
    <div className="user-content-div">
      <div id="create-fund-nav">
        <Link to="/create/fund">Create Fund</Link>
      </div>
      {funds.map((fund) => (
        <div className="fund-link" key={fund.fund_id}>
          <Link to={`/fund/${fund.fund_id}`}>{fund.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default IndexFunds;
