"use client";

import { useState, use, useRef } from "react";
import { notFound } from "next/navigation";
import ChatroomLoading from "./_components/info/ChatroomLoading";
import { SessionInUse } from "./_components/info/SessionInUse";
import RoomExpiredDialog from "./_components/dialogs/RoomExpiredDialog";
import SetNameDialog from "./_components/dialogs/SetNameDialog";
import InputBox from "./_components/chat/main/InputBox";
import { Sidebar } from "./_components/chat/info/Sidebar";
import { ChatroomInfo } from "./_components/chat/info/ChatroomInfo";
import MessageList from "./_components/chat/main/MessageList";
import useChatroomInfo from "./hooks/useChatroomInfo";
import useSession from "./hooks/useSession";
import useRoomUpdates from "./hooks/useRoomUpdates";

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("");
  const mainRef = useRef<HTMLDivElement>(null);

  const chatroomInfo = useChatroomInfo(code);
  const { onlineUsers, offlineUsers, roomExpired } = useRoomUpdates();
  const { sessionInUse, session, setSession } = useSession(
    setCurrentUser,
    code
  );

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
      <title>{`${chatroomInfo.name} | QuickRoom`}</title>
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
        <ChatroomInfo chatroomInfo={chatroomInfo} code={code} />
        <MessageList
          currentUser={currentUser}
          onlineUsers={onlineUsers}
          mainRef={mainRef}
        />
        {session && <InputBox session={session} />}
      </main>
    </div>
  );
}
