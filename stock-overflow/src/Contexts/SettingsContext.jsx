import { useState, createContext, useContext } from 'react';

// Create Context object.
const SettingsContext = createContext();

// Export Provider
export function SettingsContextProvider(props) {
  const { children } = props;
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiSelectType, setMultiSelectType] = useState('standard');
  const [indvar, setIndVar] = useState('Price');
  const [dataType, setDataType] = useState('plain');
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2023-01-01');

  console.log(endDate);
  return (
    <SettingsContext.Provider
      value={{
        multiSelect,
        setMultiSelect,
        multiSelectType,
        setMultiSelectType,
        indvar,
        setIndVar,
        dataType,
        setDataType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// Export useContext Hook.
export function useSettingsContext() {
  return useContext(SettingsContext);
}
