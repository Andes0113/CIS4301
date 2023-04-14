import './ControlPanel.css';
import { useSettingsContext } from '../../../Contexts/SettingsContext';
import { useState } from 'react';

function ControlPanel() {
  const settings = useSettingsContext();
  const {
    multiSelect,
    setMultiSelect,
    indvar,
    setIndVar,
    dataType,
    setDataType,
    multiSelectType,
    setMultiSelectType,
  } = settings;
  return (
    <div id="control-panel">
      <div className="control-option">
        <label htmlFor="multiselect">MultiSelect</label>
        <input
          id="multiselect"
          type="checkbox"
          value={multiSelect}
          onChange={() => setMultiSelect(!multiSelect)}
        />
        {multiSelect && (
          <div id="multiselect-options">
            <div className="control-option">
              <select
                id="multiselect-display"
                value={multiSelectType}
                onChange={(e) => setMultiSelectType(e.target.value)}
              >
                <option value="standard">Show Both</option>
                <option value="difference">Show Diff</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="control-option">
        <label>Y-Axis</label>
        <select
          name="Set Independent Variable"
          id="indep-var"
          value={indvar}
          onChange={(e) => setIndVar(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="volume">Volume</option>
        </select>
      </div>
      <div className="control-option">
        <label>Data Type</label>
        <select
          name="Set Data Type"
          id="data-type"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="plain">Plain</option>
          <option value="difference">Diff</option>
          <option value="percent_difference">% Diff</option>
        </select>
      </div>
    </div>
  );
}

export default ControlPanel;
