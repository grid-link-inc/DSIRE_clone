import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat'; // Import the chat icon from Material UI icons
import { FormControl, FormLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ChatWidget = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]); // Messages will be objects with { text, sender }
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [firstOpen, setFirstOpen] = useState(true); // Track the first time the chat is opened
  const [threadID, setThreadID] = useState(null); // Track the thread ID for the chat

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Add new message as a user message
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');

    // Simulate a system reply for demonstration
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { text: "System's reply!", sender: 'system' }]);
    }, 1000);
  };

  const onFirstOpen = () => {
    const randomNubmer = Math.floor(Math.random() * 100);
    console.log('Chat widget opened for the first time!', randomNubmer);

    // Create a new thread
  };

  // Use useEffect to detect when the chat is opened for the first time
  useEffect(() => {
    if (isOpen && firstOpen) {
      onFirstOpen();
      setFirstOpen(false); // Ensure the callback is not called again
    }
  }, [isOpen, firstOpen]); // Depend on isOpen and firstOpen

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        color="primary"
        sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'background.paper', borderRadius: '50%' }}
      >
        <ChatIcon />
      </IconButton>
      {isOpen && (
        <Paper elevation={3} sx={{ p: 2, mb: 8, maxWidth: 300 }}>
          <Typography variant="h6">Policy Expert Bot</Typography>
          <List sx={{ minHeight: 50, maxHeight: 250, overflow: 'auto', bgcolor: 'grey.100', p: 1, borderRadius: '4px' }}>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ display: 'flex', flexDirection: message.sender === 'user' ? 'row-reverse' : 'row' }}>
                <ListItemText
                  primary={message.text}
                  sx={{
                    wordBreak: 'break-word',
                    bgcolor: message.sender === 'system' ? 'grey.300' : 'primary.light',
                    color: message.sender === 'system' ? 'grey.800' : 'common.white',
                    borderRadius: '10px',
                    p: 1
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Box component="form" sx={{ display: 'flex', mt: 1 }} onSubmit={handleSendMessage}>
            <TextField
              label="Type your message here..."
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ mr: 1 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ChatWidget;
