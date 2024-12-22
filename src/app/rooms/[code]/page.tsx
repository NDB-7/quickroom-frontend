"use client";

import { useEffect, useState, use, useRef } from "react";
import {
  ClientMessageType,
  ChatroomInfoType,
  RejoinResponse,
  SessionType,
} from "./types";
import { notFound } from "next/navigation";
import { formatTime } from "@/utils/formatTime";
import { playAudio } from "@/utils/playAudio";
import ChatroomLoading from "./_components/info/ChatroomLoading";
import { SessionInUse } from "./_components/info/SessionInUse";
import RoomExpiredDialog from "./_components/dialogs/RoomExpiredDialog";
import SetNameDialog from "./_components/dialogs/SetNameDialog";
import { Message } from "./_components/chat/main/Message";
import socket from "./socket";
import InputBox from "./_components/chat/main/InputBox";
import { Sidebar } from "./_components/chat/info/Sidebar";
import { ChatroomInfo } from "./_components/chat/info/ChatroomInfo";

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
  const [roomExpired, setRoomExpired] = useState(false);
  const [expirationString, setExpirationString] = useState(
    "Calculating expiration time..."
  );

  const mainRef = useRef<HTMLDivElement>(null);
  const sendAudioRef = useRef<HTMLAudioElement>(null);
  const receiveAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const getChatroomInfo = async () => {
      try {
        const resString = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + `/rooms/${code}`
        );
        const resData: ChatroomInfoType = await resString.json();
        setChatroomInfo(resData);
      } catch {
        setChatroomInfo({ success: false });
      }
    };

    getChatroomInfo();

    socket.on("updateUserList", (onlineUserList, offlineUserList) => {
      setOnlineUsers(onlineUserList);
      setOfflineUsers(offlineUserList);
    });

    socket.on("roomExpired", () => setRoomExpired(true));

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
          if (response.expired) {
            localStorage.removeItem("session");
          }
        }
      });
    }

    sendAudioRef.current = new Audio("/sounds/send.mp3");
    receiveAudioRef.current = new Audio("/sounds/receive.mp3");

    return () => {
      socket.off("updateUserList");
      socket.off("roomExpired");
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (chatroomInfo?.success) {
        const msUntilExpiration = chatroomInfo.expiresAt - Date.now();
        const timeString = formatTime(msUntilExpiration);
        setExpirationString(`Expires in ${timeString}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chatroomInfo]);

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

  if (roomExpired) return <RoomExpiredDialog />;
  if (!chatroomInfo) return <ChatroomLoading />;
  if (sessionInUse) return <SessionInUse>{sessionInUse}</SessionInUse>;
  if (!chatroomInfo.success) return notFound();
  if (currentUser === "")
    return (
      <SetNameDialog
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
        className="relative h-full flex-grow overflow-y-scroll overflow-x-hidden"
        ref={mainRef}
      >
        <ChatroomInfo
          chatroomName={chatroomInfo.name}
          code={code}
          expirationString={expirationString}
        />
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
