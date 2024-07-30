import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="messages">
      <h1>Messages</h1>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <strong>Email:</strong> {message.email}<br />
            <strong>Date:</strong> {new Date(message.date).toLocaleString()}<br />
            <strong>Message:</strong> {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
