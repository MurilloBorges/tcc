/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getUser } from '../../services/authentication';
import profile from '../../assets/user.png';

import styles from './styles';
import api from '../../services/api';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userCurrent, setUserCurrent] = useState({});

  useEffect(() => {
    async function getChat() {
      const user = JSON.parse(await getUser()) || null;
      setUserCurrent(user);

      await api
        .get('chats')
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response.data);
            if (response.data.messages.length === 0) {
              setMessages([
                {
                  _id: 1,
                  text: `Olá ${user.name.split(' ')[0]}. Como posso te ajudar?`,
                  createdAt: new Date(),
                  user: {
                    _id: '5f7baa4e6c68dfbe5dd5992f',
                    name: 'Psicólogo Online',
                    avatar: profile,
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
                    _id: message.user,
                    name: '',
                    avatar: profile,
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

  // useEffect(() => {
  //   function log() {
  //     console.log('messages', messages);
  //   }

  //   log();
  // }, [messages]);

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

  const handleSend = useCallback((newMessage = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
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
