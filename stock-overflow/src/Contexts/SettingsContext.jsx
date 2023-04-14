import { useState, createContext, useContext } from 'react';

// Create Context object.
const SettingsContext = createContext();

// Export Provider
export function SettingsContextProvider(props) {
  const { children } = props;
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiSelectType, setMultiSelectType] = useState('standard');
  const [indvar, setIndVar] = useState('price');
  const [dataType, setDataType] = useState('plain');

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
