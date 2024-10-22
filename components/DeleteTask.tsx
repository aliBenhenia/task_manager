// components/DeleteTask.tsx
import React from 'react';

interface DeleteTaskProps {
  onDelete: () => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ onDelete }) => {
  return (
    <button onClick={onDelete} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteTask;
