"use client";

import * as Ably from "ably";
import ChatBox from "./chat-box.jsx";

export default function Chat() {
  const client = new Ably.Realtime({
    key: process.env.ABLY_API_KEY,
  });
  return <ChatBox />;
}
