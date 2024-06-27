// frontend/src/components/Messages.tsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface MessageProps {
  text: string;
  sender: 'left' | 'right'; // Sender can be 'left' or 'right'
  timestamp: number;
}

const Message: React.FC<MessageProps> = ({ text, sender, timestamp }) => (
  <Box
    display="flex"
    justifyContent={sender === 'right' ? 'flex-end' : 'flex-start'} // Align messages based on sender
    mb={2}
  >
    <Box>
      <Paper
        elevation={3}
        style={{
          width: 'auto',
          maxWidth: '100%',
          padding: '10px',
          borderRadius: '15px',
          backgroundColor: sender === 'right' ? '#e1f5fe' : '#ffffff', // Background color based on sender
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Paper>
      <Typography
        variant="caption"
        display="block"
        align={sender === 'right' ? 'right' : 'left'} // Align timestamp based on sender
        style={{ marginTop: '5px' }}
      >
        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Typography>
    </Box>
  </Box>
);

export default Message;
