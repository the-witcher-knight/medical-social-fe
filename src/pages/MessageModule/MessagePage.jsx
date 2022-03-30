import {
  Grid,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
} from '@mui/material';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAllChatRoom, setSelectedChatRoom } from './message.reducer';
import ChatArea from './ChatArea';

const MessagePage = () => {
  const dispatch = useAppDispatch();

  const rooms = useAppSelector(state => state.message.chatRoomList);

  useEffect(() => {
    dispatch(getAllChatRoom());
  }, []);

  const onClickRoom = room => {
    dispatch(setSelectedChatRoom(room));
  };

  const loadMoreRoom = () => {
    console.log('load more room');
  };

  return (
    <Grid
      container
      ml={3}
      mt={3}
      mb={3}
      component={Paper}
      sx={{ width: '100%', height: '82vh' }}
      spacing={2}
    >
      <Grid item md={9} sm={11} sx={{ borderRight: '1px solid #e0e0e0' }}>
        <ChatArea />
      </Grid>
      <Grid item md={3} sm={1}>
        <List>
          <InfiniteScroll
            dataLength={rooms.length}
            next={loadMoreRoom}
            height={'43rem'}
            style={{ display: 'flex', flexDirection: 'column' }}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {rooms.map(item => (
              <ListItem key={item.id} component={Button} onClick={() => onClickRoom(item)}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={item.id} />
              </ListItem>
            ))}
          </InfiniteScroll>
        </List>
      </Grid>
    </Grid>
  );
};
export default MessagePage;
