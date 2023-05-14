import React, { useState } from 'react';
import classes from './chat.module.scss';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from './components/ChatBox';
function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {
        isOpen
          ? <>
            <ChatBox setIsOpen={setIsOpen}/>
          </>
          : <div className={classes.iconWrapper} onClick={() => setIsOpen(true)}>
            <ChatIcon className={classes.icon}/> CHAT
          </div>
      }
    </>
  );
}

export default Chat;
