// components/EditTask.tsx
import React from 'react';

interface EditTaskProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

const EditTask: React.FC<EditTaskProps> = ({ title, onTitleChange, onSubmit, isEditing }) => {
  return (
    <form onSubmit={onSubmit} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={isEditing ? "Edit task..." : "New task..."}
        className="input"
        required
      />
      <button type="submit" className="button">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default EditTask;
