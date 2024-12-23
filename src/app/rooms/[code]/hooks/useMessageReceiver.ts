import { useEffect, useRef, useState } from "react";
import socket from "../socket";
import { ClientMessageType } from "../types";
import { playAudio } from "@/utils/playAudio";

export default function useMessageReceiver(currentUser: string) {
  const [messages, setMessages] = useState<ClientMessageType[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  const sendAudioRef = useRef<HTMLAudioElement>(null);
  const receiveAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    sendAudioRef.current = new Audio("/sounds/send.mp3");
    receiveAudioRef.current = new Audio("/sounds/receive.mp3");
  }, []);

  useEffect(() => {
    socket.on(
      "receiveMessage",
      (sender, content, serverNotification, sentAt) => {
        let newMessage: ClientMessageType;
        if (sender === currentUser) {
          newMessage = { sentByMe: true, content, sentAt };
          playAudio(sendAudioRef.current);
        } else {
          newMessage = {
            sentByMe: false,
            sender,
            content,
            serverNotification,
            sentAt,
          };
          playAudio(receiveAudioRef.current);
        }
        setMessages(prevState => [...prevState, newMessage]);
        mainRef.current?.scrollTo({
          top: mainRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    );

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUser]);

  return { messages, mainRef };
}
