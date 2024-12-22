import { ClientMessageType } from "../../../types";

export function Message({
  sentByMe,
  sender,
  content,
  hideName,
  onlineUsers,
  serverNotification,
}: ClientMessageType & { hideName: boolean; onlineUsers: string[] }) {
  if (serverNotification === true) {
    return (
      <li className="text-center mt-4 text-gray-600 text-sm">{content}</li>
    );
  } else
    return (
      <li className={`space-y-1 ${hideName ? "mt-2" : "mt-4"}`}>
        {!hideName &&
          (sentByMe ? (
            <p className="text-gray-800">
              You <span className="text-xs text-gray-500 ml-1">11:25 AM</span>
            </p>
          ) : (
            <p
              className={
                onlineUsers.includes(sender)
                  ? "text-gray-600"
                  : "text-gray-500 italic"
              }
            >
              {sender}
            </p>
          ))}
        <p
          className={`${
            sentByMe ? "bg-cyan-100" : "bg-gray-50"
          } rounded-lg max-w-xl text-wrap break-words inline-block py-1 px-2 shadow-sm animate-pop-in`}
        >
          {content}
        </p>
      </li>
    );
}
