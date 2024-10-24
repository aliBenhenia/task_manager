
import React from 'react';
import "../styles/notification.css"
import { NotificationProps } from '../interfaces/interfaces';

const Notification: React.FC<NotificationProps> = ({ message, visible }) => {
  return (
    <div className={`notification ${visible ? 'visible' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
