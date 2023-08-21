import React, { useState } from 'react';
import axios from 'axios';
import ITaskPopupProps from './ITaskPopupProps';

const TaskPopup: React.FC<ITaskPopupProps> = ({ config, taskId, onFinish }) => {
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummaryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputSummary = event.target.value;
    if (inputSummary.length <= 300) {
      setSummary(inputSummary);
      setError('');
    } else {
      setError('Summary must be less than 300 characters.');
    }
  };

  const handleFinish = async () => {
    try {
      const finishedAt = new Date().toISOString();
      await axios.patch(`${config.apiUrl}/tasks/finish/${taskId}`, {
        finishedAt,
        summary,
      });
      onFinish();
    } catch (error) {
      console.error('Failed to finish task:', error);
    }
  };

  return (
    <div className="popup">
      <textarea
        value={summary}
        onChange={handleSummaryChange}
        placeholder="Enter task summary (max 300 characters)"
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleFinish} disabled={summary.length === 0}>
        Finish Task
      </button>
    </div>
  );
};

export default TaskPopup;
