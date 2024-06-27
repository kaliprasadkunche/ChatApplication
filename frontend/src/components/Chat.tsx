// frontend/src/components/Chat.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';
import Message from './Messages';
import { fetchUsers, fetchMessages } from '../api';
import SendIcon from '@mui/icons-material/Send';

interface ChatProps {
  token: string;
  userId: string;
}

interface MessageData {
  text: string;
  sender: string;
  recipient: string;
  timestamp: number;
}

interface User {
  _id: string;
  username: string;
  avatarUrl?: string;
}

const Chat: React.FC<ChatProps> = ({ token, userId }) => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await fetchUsers(token);
        // Exclude the logged-in user
        setUsers(users.filter((user: User) => user._id !== userId));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchAllUsers();
  }, [token, userId]);

  useEffect(() => {
    if (selectedUser) {
      const fetchPreviousMessages = async () => {
        try {
          const previousMessages = await fetchMessages(token, selectedUser._id);
          setMessages(previousMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchPreviousMessages();

      ws.current = new WebSocket(`ws://localhost:5000?token=${token}`);
      ws.current.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, newMessage]);
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [selectedUser, token]);

  const sendMessage = () => {
    if (ws.current && message && selectedUser) {
      const newMessage: MessageData = {
        text: message,
        sender: userId,
        recipient: selectedUser._id,
        timestamp: Date.now(),
      };
      ws.current.send(JSON.stringify(newMessage));
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  return (
    <Container maxWidth="xl" style={{ display: 'flex', height: '100vh', padding: 0 }}>
      {/* Sidebar */}
      <Box width="20%" style={{ borderRight: '1px solid #ddd', overflowY: 'auto', height: '100vh' }}>
        <Typography variant="h6" style={{ padding: '16px' }}>Chats</Typography>
        <Divider />
        <List>
          {users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem button onClick={() => setSelectedUser(user)}>
                <ListItemAvatar>
                  <Avatar src={user.avatarUrl || ''}>{user.username[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
      
      {/* Chat Area */}
      <Box width="80%" display="flex" flexDirection="column" style={{ height: '100vh' }}>
        {/* Chat Header */}
        <Box p={2} style={{ borderBottom: '1px solid #ddd' }}>
          <Typography variant="h6">{selectedUser?.username || 'Select a user to chat'}</Typography>
        </Box>
        
        {/* Chat Messages */}
        <Box flex={1} p={2} style={{ overflowY: 'auto', background: '#f9f9f9', overflowX: 'hidden' }}>
          {messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.text}
              sender={msg.sender === userId ? 'right' : 'left'} // Determine the side based on sender
              timestamp={msg.timestamp}
            />
          ))}
        </Box>
        
        {/* Message Input */}
        <Box p={2} display="flex" flexDirection='row'>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Type a message"
            sx={{borderRadius: '200px'}}
          />
          <Button onClick={sendMessage} variant="contained" color="primary" style={{ marginLeft: '10px', marginTop: '15px', height: '60px', width: '40px', borderRadius: 120}}>
            <SendIcon sx={{fontSize: '20px'}} />
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
