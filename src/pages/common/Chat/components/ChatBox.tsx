import React, { useEffect, useState } from 'react';
import classes from './chat-box.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { io, Socket } from 'socket.io-client';
interface IProps {
  setIsOpen: any
}
function ChatBox({ setIsOpen }: IProps) {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [receiverId, setReceiverId] = useState(3);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    const newSocket = io('https://dhwatch.onrender.com/chat-gate-way', { query: { userId: 1 } });
    setSocket(newSocket);
  }, []);
  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to WebSocket server!');
        setConnected(true);
      });
      socket.on('server-send-data', (data: any) => {
        console.log('Received data from server:', data);
        setMessages((prev: any) => [...prev, data]);
      });
      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server.');
        setConnected(false);
      });
      return () => {
        socket.off('connect');
        socket.off('server-send-data');
        socket.off('disconnect');
      };
    }
  });

  const handleSendMessage = () => {
    socket?.emit('client-send-data', { message, receiverId: 1, senderId: 1 });
    setMessage('');
  };
  console.log(message);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.title}>Chat</h1>
        <div className={classes.btns}>
          <KeyboardArrowDownIcon className={classes.icon} onClick={() => setIsOpen(false)}/>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes['chat-name']}>
          <div className={classes.item + ' ' + classes.active}>
            <img src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg" alt="" className={classes.img}/>
            <h1 className={classes.name}>Name</h1>
          </div>
          <div className={classes.item}>
            <img src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg" alt="" className={classes.img}/>
            <h1 className={classes.name}>Name</h1>
          </div>
          <div className={classes.item}>
            <img src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg" alt="" className={classes.img}/>
            <h1 className={classes.name}>Name</h1>
          </div>
        </div>
        <div className={classes['chat-box']}>
          <div className={classes['chat-main']}></div>
          <div className={classes['chat-input']}>
            <TextField
              id="outlined-basic"
              variant="filled"
              className={classes.input}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className={classes['send-box']}>
              <SendIcon className={classes.send} onClick={handleSendMessage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
