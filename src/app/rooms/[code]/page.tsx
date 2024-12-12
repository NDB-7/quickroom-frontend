"use client";

import { LoaderCircle, LogOut, Pencil, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use, useRef } from "react";
import { io } from "socket.io-client";
import { ClientMessageType, ChatroomInfoType } from "./types";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const socket = io("http://localhost:4444");

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(["Guest", "User"]);
  const [messages, setMessages] = useState<ClientMessageType[]>([]);
  const [chatroomInfo, setChatroomInfo] = useState<ChatroomInfoType>();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getChatroomInfo = async () => {
      const res = await fetch("http://localhost:4444/rooms/test");
      const resJson: ChatroomInfoType = await res.json();
      setChatroomInfo(resJson);
    };

    getChatroomInfo();

    socket.on("receiveMessage", (sender, content) => {
      let newMessage: ClientMessageType;
      alert(`Sender: ${sender}, User: ${currentUser}`);
      if (sender === currentUser) newMessage = { sentByMe: true, content };
      else newMessage = { sentByMe: false, sender, content };
      setMessages(prevState => [...prevState, newMessage]);
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  if (!chatroomInfo) return <ChatroomLoading />;
  if (!chatroomInfo.success) return notFound();
  if (currentUser === "") return <NameDialog setCurrentUser={setCurrentUser} />;

  return (
    <div className="fixed flex w-full h-full">
      <Sidebar onlineUsers={onlineUsers} currentUser={currentUser} />
      <main
        className="relative h-full flex-grow overflow-y-scroll"
        ref={mainRef}
      >
        <ChatroomInfo chatroomName={chatroomInfo.name} code={code} />
        <ul
          className="px-4 pt-16 min-h-[90vh]"
          aria-label="Chatroom conversation"
          aria-live="polite"
          tabIndex={0}
        >
          {messages.map((msg, msgIndex) => {
            let hideName = false;
            if (msgIndex > 0 && messages[msgIndex - 1].sender === msg.sender)
              hideName = true;
            return <Message {...msg} key={msgIndex} hideName={hideName} />;
          })}
        </ul>
        <InputBox />
      </main>
    </div>
  );
}

function Message({
  sentByMe,
  sender,
  content,
  hideName,
}: ClientMessageType & { hideName: boolean }) {
  return (
    <li className={`space-y-1 ${hideName ? "mt-2" : "mt-4"}`}>
      {!hideName &&
        (sentByMe ? (
          <p className="text-gray-800">You</p>
        ) : (
          <p className="text-gray-600">{sender}</p>
        ))}
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
      <div className="p-4 space-y-2 overflow-y-scroll">
        <h2 className="uppercase tracking-wider text-gray-700">
          Online Users - {onlineUsers.length}
        </h2>
        <ul className="space-y-1">
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
    <header className="fixed bg-white w-full border-b-2 py-2 px-4 flex items-center justify-between">
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

function InputBox() {
  const [messageInput, setMessageInput] = useState("");

  function handleMessageInput() {
    if (messageInput !== "") socket.emit("sendMessage", messageInput);
    setMessageInput("");
  }

  return (
    <div className="sticky bottom-0 w-full p-3">
      <form
        className="flex items-center h-12 rounded-full bg-gray-50 justify-between border-2 border-gray-200"
        onSubmit={e => e.preventDefault()}
      >
        <input
          className="ml-6 bg-transparent w-full outline-none pr-2"
          placeholder="Type a message..."
          aria-label="Message input box"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
        <button
          className="bg-cyan-500 h-5/6 aspect-square rounded-full mr-1 flex items-center justify-center"
          onClick={handleMessageInput}
        >
          <SendHorizontal className="w-7/12 h-7/12 stroke-white" />
        </button>
      </form>
    </div>
  );
}

function ChatroomLoading() {
  return (
    <div className="flex flex-col mt-8 text-2xl items-center">
      <h1>Loading your chatroom...</h1>
      <LoaderCircle className="animate-spin mt-6" width={48} height={48} />
    </div>
  );
}

function NameDialog({
  setCurrentUser,
}: {
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [nameInput, setNameInput] = useState("");

  function onSubmit() {
    if (nameInput !== "") {
      socket.emit("setName", nameInput);
      setCurrentUser(nameInput);
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set your name</DialogTitle>
          <DialogDescription>
            You're currently joining a chatroom. What name would you like to
            chat under?
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-2" onSubmit={onSubmit}>
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={nameInput}
            className="col-span-3"
            onChange={e => setNameInput(e.target.value)}
          />
          <DialogFooter>
            <Button type="submit" className="mt-4">
              Join chatroom
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
