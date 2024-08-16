"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatBox from "./chat-box.jsx";

export default function Chat() {
  // const client = Ably.Realtime.Promise({ authUrl: "/api" });
  const client = new Ably.Realtime({
    key: "xiEQTw.SBJKWA:Kv7RDv6PngxN8y8ttHsOWHDQqchaEYtU9rgKefhsl7o",
  });

  return <ChatBox />;
}
