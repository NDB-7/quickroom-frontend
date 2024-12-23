import { useEffect, useState } from "react";
import { ChatroomInfoType } from "../types";
import formatCountdown from "@/utils/formatCountdown";

export default function useChatroomExpiration(
  chatroomInfo: ChatroomInfoType | undefined
) {
  const [expirationString, setExpirationString] = useState(
    "Calculating expiration time..."
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (chatroomInfo?.success) {
        const msUntilExpiration = chatroomInfo.expiresAt - Date.now();
        const timeString = formatCountdown(msUntilExpiration);
        setExpirationString(`Expires in ${timeString}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chatroomInfo]);

  return expirationString;
}
