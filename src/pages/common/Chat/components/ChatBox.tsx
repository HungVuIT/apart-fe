import React, { useEffect, useRef, useState } from 'react';
import classes from './chat-box.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setOpenChat } from '../../../../redux/common/commonSlice';
import { getUserInfoById } from '../../../../api/service/user-service';
import { IUserInfo } from '../../../../interface/user/interface';

function ChatBox() {
  const { socket, inforSocket } = useAppSelector(state => state.common);
  const { profile } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [messageList, setMessageList] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const divRef = useRef<HTMLDivElement>(null);
  const [receiverInfor, setReceiverInfor] = useState<IUserInfo | null>(null);
  useEffect(() => {
    if (socket) {
      socket.on('server-send-data', (data: any) => {
        console.log('Received data from server:', data);
        setMessageList((prev: any) => [...prev, data]);
        if (divRef?.current) {
          divRef.current.scrollTop = divRef.current.scrollHeight;
        }
      });
      return () => {
        socket.off('server-send-data');
      };
    }
  });
  useEffect(() => {
    getInforReceiver();
  }, [inforSocket.receiverId]);
  const getInforReceiver = async () => {
    const res = await getUserInfoById(inforSocket.receiverId);
    setReceiverInfor(res);
  };
  const handleSendMessage = () => {
    if (message) {
      setMessageList((prev: any) => [...prev, { message, receiverId: inforSocket.receiverId, senderId: profile.id }]);
      socket?.emit('client-send-data', { message, receiverId: inforSocket.receiverId, senderId: profile.id });
      setMessage('');
      if (divRef?.current) {
        divRef.current.scrollTop = divRef.current.scrollHeight;
      }
    }
  };
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
          <KeyboardArrowDownIcon className={classes.icon} onClick={() => dispatch(setOpenChat(false))}/>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes['chat-name']}>
          <div className={classes.item + ' ' + classes.active}>
            {
              receiverInfor
                ? <>
                  <img src={receiverInfor.avatar} alt="" className={classes.img}/>
                  <h1 className={classes.name}>{receiverInfor?.lastName || ' '}</h1>
                </>
                : <></>
            }
          </div>
        </div>
        <div className={classes['chat-box']}>
          <div className={classes['chat-main']} ref={divRef}>
            {
              messageList.length > 0
                ? messageList.map((message, index) => (
                  message.senderId === profile.id
                    ? <div key={index} className={classes['chat-right']}>
                        <div className={classes['chat-content']}>{message.message}</div>
                      </div>
                    : <div key={index} className={classes['chat-left']}>
                        <div className={classes['chat-content']}>{message.message}</div>
                      </div>
                ))
                : <></>
            }
          </div>
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
