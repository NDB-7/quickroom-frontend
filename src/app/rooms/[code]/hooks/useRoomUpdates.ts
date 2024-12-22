import { useEffect, useState } from "react";
import socket from "../socket";

export default function useRoomUpdates() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<string[]>([]);
  const [roomExpired, setRoomExpired] = useState(false);

  useEffect(() => {
    socket.on("updateUserList", (onlineUserList, offlineUserList) => {
      setOnlineUsers(onlineUserList);
      setOfflineUsers(offlineUserList);
    });

    socket.on("roomExpired", () => setRoomExpired(true));

    return () => {
      socket.off("updateUserList");
      socket.off("roomExpired");
    };
  }, []);

  return { onlineUsers, offlineUsers, roomExpired };
}
