import { RefObject } from "react";
import { Message } from "./Message";
import useMessageReceiver from "../../../hooks/useMessageReceiver";

export default function MessageList({
  currentUser,
  onlineUsers,
  mainRef,
}: {
  currentUser: string;
  onlineUsers: string[];
  mainRef: RefObject<HTMLDivElement | null>;
}) {
  const { messages } = useMessageReceiver(currentUser, mainRef);

  return (
    <ul
      className="px-4 pt-16 min-h-[90vh] pb-9"
      aria-label="Chatroom conversation"
      aria-live="polite"
      tabIndex={0}
    >
      {messages.map((msg, msgIndex) => {
        let hideName = false;
        if (msgIndex > 0 && messages[msgIndex - 1].sender === msg.sender)
          hideName = true;
        return (
          <Message
            {...msg}
            key={msgIndex}
            hideName={hideName}
            onlineUsers={onlineUsers}
          />
        );
      })}
    </ul>
  );
}
