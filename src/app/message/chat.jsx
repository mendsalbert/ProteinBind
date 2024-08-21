"use client";

import * as Ably from "ably";
import ChatBox from "./chat-box.jsx";

export default function Chat() {
  const client = new Ably.Realtime({
    key: "VpPesA.e058xw:HltRuWqP4MBNSxON5IERYcR4ODsj96dUmpcwC84keGk",
  });
  return <ChatBox />;
}
