import { ClientMessageType } from "../../../types";
import { Message } from "./Message";

export default function MessageList({
  messages,
  onlineUsers,
}: {
  messages: ClientMessageType[];
  onlineUsers: string[];
}) {
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
