import { useEffect, useState } from "react";
import { ChatroomInfoType } from "../types";

export default function useChatroomInfo(code: string) {
  const [chatroomInfo, setChatroomInfo] = useState<ChatroomInfoType>();

  useEffect(() => {
    const abortController = new AbortController();

    const getChatroomInfo = async () => {
      try {
        const resString = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + `/rooms/${code}`,
          {
            signal: abortController.signal,
          }
        );
        const resData: ChatroomInfoType = await resString.json();
        setChatroomInfo(resData);
      } catch {
        setChatroomInfo({ success: false });
      }
    };

    getChatroomInfo();

    return () => {
      abortController.abort();
    };
  }, [code]);

  return chatroomInfo;
}
