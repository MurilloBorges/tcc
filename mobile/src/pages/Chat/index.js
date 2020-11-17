/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text, Alert } from 'react-native';
import { getUser } from '../../services/authentication';
import profile from '../../assets/user.png';

import styles from './styles';
import api from '../../services/api';

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getChat() {
      const user = JSON.parse(await getUser()) || null;

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
              setMessages([
                response.data.messages.map((message) => ({
                  _id: message._id,
                  text: message.message,
                  createdAt: message.createdAt,
                  user: {
                    _id: message.user,
                    name: '',
                    avatar: profile,
                  },
                })),
              ]);
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

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Psicólogo online</Text>
      </View>
      <View style={styles.main}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
      <View style={styles.footer} />
    </View>
  );
}
