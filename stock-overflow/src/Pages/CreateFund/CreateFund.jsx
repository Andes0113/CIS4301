import { useAuthContext } from '../../Contexts/AuthContext';
import useCompanies from '../../hooks/useCompanies';
import Header from '../header';
import { useState } from 'react';
import './CreateFund.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function CreateFund() {
  const { user } = useAuthContext();
  const { companies, loading } = useCompanies();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState([]);

  const createFund = () => {
    axios
      .post('http://localhost:8000/funds', {
        name: name,
        username: user,
        stocks: selected.map((c) => c.ticker),
      })
      .then(() => {
        setName('');
        setSelected([]);
      });
  };

  const addStock = (company) => {
    setSelected([
      ...selected.filter((c) => c.ticker !== company.ticker),
      company,
    ]);
  };

  const removeStock = (company) => {
    setSelected(selected.filter((c) => c.ticker !== company.ticker));
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Header />

      <div id="create-fund-form">
        <div id="fund-select-from">
          Companies
          {companies.map((c) => (
            <button onClick={() => addStock(c)} key={c.ticker}>
              {`(${c.ticker}) ${c.name}`}
            </button>
          ))}
        </div>
        <div id="fund-selected-all">
          Selected
          {selected.map((c) => (
            <button onClick={() => removeStock(c)} key={c.ticker}>
              {`(${c.ticker}) ${c.name}`}
            </button>
          ))}
        </div>
        <input
          type="text"
          id="create-fund-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <button id="create-form-button" onClick={createFund}>
          Create
        </button>
      </div>
    </>
  );
}

export default CreateFund;
