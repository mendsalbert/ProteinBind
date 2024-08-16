import React, { useEffect, useState } from "react";
import { useChannel } from "ably/react";
import { useAbly } from "ably/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function ChatBox() {
  const ably = useAbly();
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState({});
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const channelName = "chat-demo";
  const { channel } = useChannel(channelName, (message) => {
    if (message.data.group === currentGroup) {
      const history = receivedMessages[currentGroup] || [];
      setMessages({
        ...receivedMessages,
        [currentGroup]: [...history, message.data],
      });
    }
  });

  useEffect(() => {
    // Load groups from local storage
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
  }, []);

  useEffect(() => {
    // Save groups to local storage
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const createGroup = (groupName) => {
    if (groupName && !groups.includes(groupName)) {
      setGroups([...groups, groupName]);
      setCurrentGroup(groupName);
    }
  };

  const joinGroup = (groupName) => {
    setCurrentGroup(groupName);
  };

  const sendChatMessage = (messageText) => {
    if (currentGroup && channel) {
      const message = {
        group: currentGroup,
        name: userName,
        image: userImage,
        data: messageText,
        timestamp: new Date().toISOString(),
      };
      channel.publish("chat-message", message, (err) => {
        if (err) {
          console.error("Error sending message:", err);
        }
      });
      setMessageText("");
    }
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const messages = currentGroup
    ? (receivedMessages[currentGroup] || []).map((message, index) => {
        const isMe = message.connectionId === ably.connection.id;
        return (
          <div
            key={index}
            className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`rounded-lg p-3 ${
                isMe ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <div className="mb-2 flex items-center">
                <img
                  src={message.image || "/default-avatar.png"}
                  alt={message.name}
                  className="mr-2 h-8 w-8 rounded-full"
                />
                <span className="font-bold">{message.name}</span>
              </div>
              <p>{message.data}</p>
              <span className="text-gray-500 text-xs">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        );
      })
    : null;

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-3xl font-bold">Drug Discovery Chat</h1>

        <div className="mb-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="mr-2 border p-2"
          />
          <input
            type="text"
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
            placeholder="Enter image URL"
            className="border p-2"
          />
        </div>

        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Create new group"
            className="mr-2 border p-2"
            onKeyPress={(e) => {
              if (e.key === "Enter") createGroup(e.target.value);
            }}
          />
          <select
            onChange={(e) => joinGroup(e.target.value)}
            className="border p-2"
          >
            <option value="">Join a group</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {currentGroup && (
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-bold">
              Current Group: {currentGroup}
            </h2>
            <div className="mb-4 h-64 overflow-y-auto">{messages}</div>
            <form onSubmit={handleFormSubmission} className="flex">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="mr-2 flex-grow border p-2"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default ChatBox;
