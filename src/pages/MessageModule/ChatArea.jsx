import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  LinearProgress,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, Controller } from 'react-hook-form';
import * as SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAccount } from 'src/shared/reducers/authentication';
import { toast } from 'react-toastify';
import { getMessageList } from './message.reducer';

const ChatArea = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.authentication.account);
  const selectedChatRoom = useAppSelector(state => state.message.selectedChatRoom);
  const messageList = useAppSelector(state => state.message.messageList);

  const [stompClient, setStompClient] = useState(null);

  const [messages, setMessages] = React.useState([]);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    dispatch(getAccount());
    connect();
  }, []);

  useEffect(() => {
    if (selectedChatRoom) {
      dispatch(getMessageList(selectedChatRoom.id));
    }
  }, [selectedChatRoom]);

  useEffect(() => {
    if (messageList.length > 0) {
      setMessages(messageList);
    }
  }, [messageList]);

  // ! lát xóa
  useEffect(() => {
    if (messages !== []) {
      console.log(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChatRoom !== null && stompClient !== null) {
      stompClient.subscribe(`/topic/${selectedChatRoom.id}`, payload => {
        console.log(payload.body);
        setMessages(messages => [JSON.parse(payload.body), ...messages]);
      });
    }
  }, [selectedChatRoom, stompClient]);

  const connect = () => {
    const socket = new SockJS(`http://localhost:8080/ws`);
    const stompClient = over(socket);
    stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
    });
    setStompClient(stompClient); // store stomp client
  };

  const onConnectionSuccess = () => {
    console.log('connected');
  };

  const onSubmit = values => {
    if (!user) {
      toast.warning('User data error please reload page or sign in again');
      return;
    }

    const message = {
      content: values.content,
      room: {
        id: selectedChatRoom.id,
      },
      from: {
        id: user.id,
      },
    };
    stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
    reset();
  };

  const loadMore = () => {
    console.log('TODO load more message');
  };

  return (
    <>
      <List>
        {selectedChatRoom ? (
          <InfiniteScroll
            dataLength={messages.length}
            next={loadMore}
            height={'70vh'}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            hasMore={true}
            loader={<LinearProgress />}
          >
            {messages && messages.length > 0 ? (
              messages.map((item, index) => (
                <ListItem key={index}>
                  {item.from.id === user.id ? (
                    <ListItemText align="right">
                      <Typography
                        variant="body1"
                        component={Paper}
                        p={1}
                        sx={{
                          color: 'white',
                          backgroundColor: '#3d5afe',
                          width: 'max-content',
                          maxWidth: '25rem',
                        }}
                      >
                        {item.content}
                      </Typography>
                    </ListItemText>
                  ) : (
                    <ListItemText align="left">
                      <Typography
                        variant="body1"
                        component={Paper}
                        p={1}
                        sx={{
                          color: 'white',
                          backgroundColor: '#757575',
                          width: 'max-content',
                          maxWidth: '25rem',
                        }}
                      >
                        {item.content}
                      </Typography>
                    </ListItemText>
                  )}
                </ListItem>
              ))
            ) : (
              <ListItem key="no-content">
                <ListItemText align="left">
                  <Typography
                    variant="body1"
                    component={Paper}
                    p={1}
                    sx={{
                      color: 'white',
                      backgroundColor: '#757575',
                      width: 'max-content',
                      maxWidth: '25rem',
                    }}
                  >
                    Let&apos;s start the chat
                  </Typography>
                </ListItemText>
              </ListItem>
            )}
          </InfiniteScroll>
        ) : (
          <ListItem sx={{ height: '70vh' }}>
            <ListItemText>
              <Typography variant="body1">Please select a chat room</Typography>
            </ListItemText>
          </ListItem>
        )}
      </List>
      <Box
        margin="normal"
        mt={2}
        mr={2}
        component="form"
        display="flex"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <TextField
              id="outlined-basic-email"
              label="Type your message"
              variant="standard"
              fullWidth
              {...field}
            />
          )}
        />
        <Button aria-label="send" variant="outlined" type="submit" color="primary">
          <FontAwesomeIcon icon="paper-plane" />
        </Button>
      </Box>
    </>
  );
};
export default ChatArea;
