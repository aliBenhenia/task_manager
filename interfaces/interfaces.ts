export interface TaskProps {
    id: number;
    title: string;
    completed: boolean;
}

export  interface DeleteTaskProps {
    onDelete: () => void;
}
  
export interface EditTaskProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

export interface NotificationProps {
  message: string;
  visible: boolean;
}
