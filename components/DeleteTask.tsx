
import React from 'react';
import { DeleteTaskProps } from '../interfaces/interfaces';

const DeleteTask: React.FC<DeleteTaskProps> = ({ onDelete }) => {
  return (
    <button onClick={onDelete} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteTask;
