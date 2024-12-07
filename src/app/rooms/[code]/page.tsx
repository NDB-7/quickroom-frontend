"use client";

import { LogOut, Pencil, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { io } from "socket.io-client";
import { MessageType } from "./types";

const socket = io("http://localhost:4000");

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("Nathan");
  const [onlineUsers, setOnlineUsers] = useState([
    "Michael Jackson",
    "Nathan",
    "Jimmy",
  ]);
  const [messages, setMessages] = useState<MessageType>();

  return (
    <div className="fixed flex w-full h-full">
      <Sidebar onlineUsers={onlineUsers} currentUser={currentUser} />
      <main className="h-full flex-grow relative">
        <ChatroomInfo chatroomName="Chatroom Name" code={code} />
        <ul
          className="overflow-y-scroll px-4 py-2 space-y-4"
          aria-label="Chatroom conversation"
          aria-live="polite"
          tabIndex={0}
        >
          <Message
            sentByMe={true}
            content="hey man what's up... how are you doin today?"
          />
          <Message
            sentByMe={false}
            sender="Michael Jackson"
            content="Just beat it, beat it!"
          />
        </ul>
        <div className="absolute bottom-0 w-full p-3">
          <form
            className="flex items-center h-12 rounded-full bg-gray-50 justify-between border-2 border-gray-200"
            onSubmit={e => e.preventDefault()}
          >
            <input
              className="ml-6 bg-transparent w-full outline-none pr-2"
              placeholder="Type a message..."
              aria-label="Message input box"
            />
            <button className="bg-cyan-500 h-5/6 aspect-square rounded-full mr-1 flex items-center justify-center">
              <SendHorizontal className="w-7/12 h-7/12 stroke-white" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function Message({ sentByMe, sender, content }: MessageType) {
  return (
    <li className="space-y-1">
      {sentByMe ? (
        <p className="text-gray-800">me</p>
      ) : (
        <p className="text-gray-600">{sender}</p>
      )}
      <p
        className={`${
          sentByMe ? "bg-cyan-100" : "bg-gray-50"
        } rounded-lg max-w-xl inline-block py-1 px-2 shadow-sm`}
      >
        {content}
      </p>
    </li>
  );
}

function Sidebar({
  onlineUsers,
  currentUser,
}: {
  onlineUsers: string[];
  currentUser: string;
}) {
  return (
    <aside className="hidden md:w-60 lg:w-72 h-full bg-gray-50 border-r-2 md:block relative">
      <div className="p-4 space-y-4 overflow-y-scroll">
        <h2 className="uppercase tracking-wider text-gray-700">
          Online Users - {onlineUsers.length}
        </h2>
        <ul className="space-y-2">
          {onlineUsers.map((userName, userIndex) => (
            <UserInList name={userName} key={userIndex} />
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 w-full h-16 border-t-2 flex items-center bg-gray-50">
        <div className="w-full flex justify-between items-center p-6">
          <span className="text-lg">{currentUser}</span>
          <Pencil />
        </div>
      </div>
    </aside>
  );
}

function UserInList({ name }: { name: string }) {
  return (
    <li className="text-lg flex items-center gap-3">
      <div className="h-2 w-2 bg-green-500 rounded-full" />
      <span className="text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal">
        {name}
      </span>
    </li>
  );
}

function ChatroomInfo({
  chatroomName,
  code,
}: {
  chatroomName: string;
  code: string;
}) {
  return (
    <header className="bg-white w-full border-b-2 py-2 px-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {chatroomName}
          <span className="text-xs font-normal text-gray-500 ml-2">
            ({code})
          </span>
        </h1>
        <p className="text-sm text-gray-500">Expires in 53:31</p>
      </div>
      <Link href="/" aria-label="Leave Room">
        <LogOut />
      </Link>
    </header>
  );
}
