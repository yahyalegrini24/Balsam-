import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const messages = [
  {
    id: '1',
    sender: 'Dr. Emily Smith',
    avatar: require('../../../../assets/images/profile.jpg'),
    text: 'Your appointment is confirmed for Dec 25.',
    time: '10:30 AM',
    isCurrentUser: false,
  },
  {
    id: '2',
    sender: 'You',
    avatar: null, // You can set an avatar for the current user if needed
    text: 'Thank you, doctor!',
    time: '10:32 AM',
    isCurrentUser: true,
  },
  {
    id: '3',
    sender: 'Dr. Emily Smith',
    avatar: require('../../../../assets/images/profile.jpg'),
    text: 'Please arrive 10 minutes early.',
    time: '10:35 AM',
    isCurrentUser: false,
  },
];

const ChatScreen = () => {
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer,
      ]}
    >
      {!item.isCurrentUser && (
        <Image source={item.avatar} style={styles.avatar} />
      )}
      <View
        style={[
          styles.messageBubble,
          item.isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
      {item.isCurrentUser && (
        <Image source={item.avatar} style={styles.avatar} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        inverted // To show the latest message at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatList: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  currentUserContainer: {
    justifyContent: 'flex-end',
  },
  otherUserContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  currentUserBubble: {
    backgroundColor: '#4F63AC',
    alignSelf: 'flex-end',
  },
  otherUserBubble: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#FFF',
  },
  currentUserText: {
    color: '#FFF',
  },
  otherUserText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4F63AC',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
