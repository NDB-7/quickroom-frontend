import useChatroomExpiration from "../../../hooks/useChatroomExpiration";
import { ChatroomInfoType } from "../../../types";
import LeaveRoom from "./LeaveRoom";

export function ChatroomInfo({
  chatroomInfo,
  code,
}: {
  chatroomInfo: ChatroomInfoType;
  code: string;
}) {
  const expirationString = useChatroomExpiration(chatroomInfo);

  return (
    <header className="fixed bg-white w-full border-b-2 py-2 px-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {chatroomInfo.success && chatroomInfo.name}
          <span className="text-xs font-normal text-gray-500 ml-2">
            ({code})
          </span>
        </h1>
        <p className="text-sm text-gray-500">{expirationString}</p>
      </div>
      <LeaveRoom className="md:hidden" />
    </header>
  );
}
