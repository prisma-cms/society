import React, { PureComponent } from 'react';
import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";

import Notices from "./components/Notices";
import NewMessage from "./components/NewMessage";

import ChatRooms from "./components/pages/ChatRooms";
import ChatRoom from "./components/pages/ChatRooms/ChatRoom";
import CreateChatRoom from "./components/pages/ChatRooms/ChatRoom/Create";

import ChatMessages from "./components/pages/ChatMessages";
import ChatMessage from "./components/pages/ChatMessages/ChatMessage";


export {
  ContextProvider,
  SubscriptionProvider,

  Notices,
  NewMessage,

  ChatRooms,
  ChatRoom,
  CreateChatRoom,

  ChatMessages,
  ChatMessage,
}

class App extends PureComponent {

  render() {

    const {
      children,
      ...other
    } = this.props;

    return (
      <div
        {...other}
      >
        <h2>
          My awesome component
        </h2>
        {children}
      </div>
    );
  }
}

export default App;