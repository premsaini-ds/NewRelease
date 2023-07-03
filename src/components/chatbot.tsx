import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import {ChatInput, ChatPanel, ChatPopUp, MessageBubble } from "@yext/chat-ui-react";
import * as React from "react";
import "@yext/chat-ui-react/bundle.css";

// sessionStorage.setItem('checkhead', "plop")
const config: HeadlessConfig = {
  apiKey: "f12acfb7e58eab37b1f87c8aeae4d34a",
  botId: "hero-chat-bot",
  saveToSessionStorage: false,
  apiDomain: "sbx-cdn.yextapis.com",
};

const MyChat =()=> {
  return (
    <ChatHeadlessProvider config={config} >
      <ChatPopUp  title="My Chat Bot"
        showRestartButton={false}
        placeholder="Write your query here"
        stream={false}
        showTimestamp={false} />
   
      
    </ChatHeadlessProvider>
  );
}

export default MyChat;