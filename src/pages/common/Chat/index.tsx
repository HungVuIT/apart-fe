import React, { useState } from 'react';
import classes from './chat.module.scss';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBox from './components/ChatBox';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setOpenChat } from '../../../redux/common/commonSlice';
function Chat() {
  // const [isOpen, setIsOpen] = useState(false);
  const { inforSocket } = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(setOpenChat(true));
  };
  return (
    <>
      {
        inforSocket.open
          ? <>
            <ChatBox />
          </>
          : <div className={classes.iconWrapper} onClick={handleOpen}>
            <ChatIcon className={classes.icon}/> CHAT
          </div>
      }
    </>
  );
}

export default Chat;
