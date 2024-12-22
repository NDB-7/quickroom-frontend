import { useEffect, useState } from "react";
import { ChatroomInfoType } from "../types";

export default function useChatroomInfo(code: string) {
  const [chatroomInfo, setChatroomInfo] = useState<ChatroomInfoType>();

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
  }, []);

  return chatroomInfo;
}
