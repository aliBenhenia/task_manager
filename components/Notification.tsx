// components/Notification.tsx
import React from 'react';
import './Notification.css'; // Import the CSS file

interface NotificationProps {
  message: string;
  visible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, visible }) => {
  return (
    <div className={`notification ${visible ? 'visible' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
