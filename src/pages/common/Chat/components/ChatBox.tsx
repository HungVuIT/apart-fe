import React, { useState } from 'react';
import classes from './chat-box.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
interface IProps {
  setIsOpen: any
}
function ChatBox({ setIsOpen }: IProps) {
  const [message, setMessage] = useState('');
  console.log(message);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setMessage('');
    }
  };
  const handleSendMessage = () => {
    setMessage('');
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
