/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getUser } from '../../services/authentication';

import styles from './styles';
import api from '../../services/api';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userCurrent, setUserCurrent] = useState({});
  const [chat, setChat] = useState({});

  useEffect(() => {
    async function getChat() {
      const user = JSON.parse(await getUser()) || null;
      setUserCurrent(user);

      await api
        .get('chats')
        .then(async (response) => {
          if (response.status === 200) {
            setChat({
              ...chat,
              _id: response.data._id,
              createdAt: response.data.createdAt,
              updatedAt: response.data.updatedAt,
              user: response.data.user,
            });
            if (response.data.messages.length === 0) {
              setMessages([
                {
                  _id: 1,
                  text: `Olá ${user.name.split(' ')[0]}. Como posso te ajudar?`,
                  createdAt: new Date(),
                  user: {
                    _id: '5f7baa4e6c68dfbe5dd5992f',
                    name: 'Psicólogo Online',
                    avatar: '',
                  },
                },
              ]);
            } else {
              setMessages(
                response.data.messages.reverse().map((message) => ({
                  _id: message._id,
                  text: message.message,
                  createdAt: message.createdAt,
                  user: {
                    _id: message.user._id,
                    name: message.user.name,
                    avatar: '',
                  },
                }))
              );
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            Alert.alert(error.response.data.error);
          }
        });
    }

    getChat();
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  const handleSend = useCallback(async (newMessage = []) => {
    console.log('send');
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    await api
      .post('messages', { chatId: chat._id, message: newMessage[0].text })
      .then((response) => {
        console.log(response.data);
        const message = [];
        message.push({
          _id: response.data.message._id,
          text: response.data.message.output[0].message,
          createdAt: new Date(),
          user: {
            _id: '5f7baa4e6c68dfbe5dd5992f',
            name: 'Psicólogo Online',
            avatar: '',
          },
        });
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, message)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#6646ee" />
        </View>
      </Send>
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Psicólogo online</Text>
      </View>
      <View style={styles.main}>
        <GiftedChat
          messages={messages}
          onSend={(message) => handleSend(message)}
          user={{
            _id: userCurrent._id,
            name: userCurrent.name,
          }}
          placeholder="Digite uma mensagem"
          showUserAvatar
          scrollToBottom
          renderLoading={renderLoading}
          renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          renderBubble={renderBubble}
        />
      </View>
      <View style={styles.footer} />
    </View>
  );
}
