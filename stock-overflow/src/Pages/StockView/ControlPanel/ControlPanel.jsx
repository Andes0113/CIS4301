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
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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
          disabled={indvar === 'Posts'}
        />
        {multiSelect && (
          <div id="multiselect-options">
            <div className="control-option">
              <select
                id="multiselect-display"
                value={multiSelectType}
                onChange={(e) => setMultiSelectType(e.target.value)}
                disabled={indvar === 'Posts'}
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
          <option value="Price">Price</option>
          <option value="Volume">Volume</option>
          <option value="Posts">Posts</option>
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
      <div className="control-option">
        <label htmlFor="start-date-input">Start Date</label>
        <input
          id="start-date-input"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="control-option">
        <label htmlFor="end-date-input">End Date</label>
        <input
          id="end-date-input"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ControlPanel;
