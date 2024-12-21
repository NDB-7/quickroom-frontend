"use client";

import { LoaderCircle, LogOut, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use, useRef, FormEvent } from "react";
import { io } from "socket.io-client";
import {
  ClientMessageType,
  ChatroomInfoType,
  SetNameResponse,
  RejoinResponse,
  SessionType,
} from "./types";
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

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [messages, setMessages] = useState<ClientMessageType[]>([]);
  const [chatroomInfo, setChatroomInfo] = useState<ChatroomInfoType>();
  const [sessionInUse, setSessionInUse] = useState<string>();
  const [session, setSession] = useState<SessionType>();

  const mainRef = useRef<HTMLDivElement>(null);
  const sendAudioRef = useRef<HTMLAudioElement>(null);
  const receiveAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const getChatroomInfo = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + `/rooms/${code}`
        );
        const resJson: ChatroomInfoType = await res.json();
        setChatroomInfo(resJson);
      } catch {
        setChatroomInfo({ success: false });
      }
    };

    getChatroomInfo();

    socket.on("updateUserList", (onlineUserList, offlineUserList) => {
      setOnlineUsers(onlineUserList);
      setOfflineUsers(offlineUserList);
    });

    const sessionString = localStorage.getItem("session");
    const parsedSession: SessionType =
      sessionString && JSON.parse(sessionString);

    if (parsedSession) {
      socket.emit("rejoin", parsedSession, (response: RejoinResponse) => {
        if (response.success) {
          setCurrentUser(response.name);
          setSession(parsedSession);
        } else {
          if (response.message) {
            setSessionInUse(response.message);
          }
        }
      });
    }

    sendAudioRef.current = new Audio("/send.mp3");
    receiveAudioRef.current = new Audio("/receive.mp3");
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (sender, content, serverNotification) => {
      let newMessage: ClientMessageType;
      if (sender === currentUser) {
        newMessage = { sentByMe: true, content };
        playAudio(sendAudioRef.current);
      } else {
        newMessage = { sentByMe: false, sender, content, serverNotification };
        playAudio(receiveAudioRef.current);
      }
      setMessages(prevState => [...prevState, newMessage]);
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUser]);

  if (!chatroomInfo) return <ChatroomLoading />;
  if (sessionInUse) return <SessionInUse>{sessionInUse}</SessionInUse>;
  if (!chatroomInfo.success) return notFound();
  if (currentUser === "")
    return (
      <NameDialog
        setCurrentUser={setCurrentUser}
        setSession={setSession}
        room={code}
      />
    );

  return (
    <div className="fixed flex w-full h-full">
      <div className="blur-overlay" />
      <Sidebar
        onlineUsers={onlineUsers}
        offlineUsers={offlineUsers}
        currentUser={currentUser}
      />
      <main
        className="relative h-full flex-grow overflow-y-scroll"
        ref={mainRef}
      >
        <ChatroomInfo chatroomName={chatroomInfo.name} code={code} />
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
        {session && <InputBox session={session} />}
      </main>
    </div>
  );
}

function Message({
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
            <p className="text-gray-800">You</p>
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
          } rounded-lg max-w-xl inline-block py-1 px-2 shadow-sm`}
        >
          {content}
        </p>
      </li>
    );
}

function Sidebar({
  onlineUsers,
  offlineUsers,
  currentUser,
}: {
  onlineUsers: string[];
  offlineUsers: string[];
  currentUser: string;
}) {
  return (
    <aside className="hidden md:w-60 lg:w-72 h-full bg-gray-50 border-r-2 md:block relative">
      <div className="p-4 space-y-4 overflow-y-scroll">
        {onlineUsers.length > 0 && (
          <div className="space-y-2">
            <h2 className="uppercase tracking-wider text-gray-700">
              Online Users - {onlineUsers.length}
            </h2>
            <ul className="space-y-1">
              {onlineUsers.map((userName, userIndex) => (
                <UserInList name={userName} key={userIndex} online={true} />
              ))}
            </ul>
          </div>
        )}
        {offlineUsers.length > 0 && (
          <div className="space-y-2">
            <h2 className="uppercase tracking-wider text-gray-700">
              Offline Users - {offlineUsers.length}
            </h2>
            <ul className="space-y-1">
              {offlineUsers.map((userName, userIndex) => (
                <UserInList name={userName} key={userIndex} online={false} />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 w-full h-16 border-t-2 flex items-center bg-gray-50">
        <div className="w-full p-6 text-lg">{currentUser}</div>
      </div>
    </aside>
  );
}

function UserInList({ name, online }: { name: string; online: boolean }) {
  return (
    <li className="text-lg flex items-center gap-3">
      <div
        className={`h-2 w-2 ${
          online ? "bg-green-500" : "bg-gray-400"
        } rounded-full`}
      />
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
        <p className="text-sm text-gray-500">Does Not Expire</p>
      </div>
      <Link href="/" aria-label="Leave Room">
        <LogOut />
      </Link>
    </header>
  );
}

function InputBox({ session }: { session: SessionType }) {
  const [messageInput, setMessageInput] = useState("");

  function handleMessageInput() {
    if (messageInput !== "") socket.emit("sendMessage", messageInput, session);
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
          maxLength={1000}
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

function SessionInUse({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-8 text-2xl text-center mx-auto px-4 max-w-3xl">
      {children}
    </h1>
  );
}

function NameDialog({
  setCurrentUser,
  setSession,
  room,
}: {
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  setSession: React.Dispatch<React.SetStateAction<SessionType | undefined>>;
  room: string;
}) {
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameInput !== "") {
      socket.emit("setName", nameInput, room, (response: SetNameResponse) => {
        if (response.success === false) {
          setNameError(response.message);
        } else {
          const { room, id } = response.session;
          const sessionString = JSON.stringify({
            room,
            id,
          });
          localStorage.setItem("session", sessionString);
          setSession({ room, id });
          setCurrentUser(nameInput.trim());
        }
      });
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set your name</DialogTitle>
          <DialogDescription>
            You&apos;re currently joining a chatroom. What name would you like
            to chat under?
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-2" onSubmit={onSubmit}>
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={nameInput}
            maxLength={20}
            className="col-span-3"
            onChange={e => setNameInput(e.target.value)}
          />
          {nameError && <p className="text-destructive text-sm">{nameError}</p>}
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

function playAudio(audio: HTMLAudioElement | null) {
  if (!audio) return;
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }
  try {
    audio.play();
  } catch (e) {
    console.log(e);
  }
}
