import LeaveRoom from "./LeaveRoom";

export function ChatroomInfo({
  chatroomName,
  code,
  expirationString,
}: {
  chatroomName: string;
  code: string;
  expirationString: string;
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
        <p className="text-sm text-gray-500">{expirationString}</p>
      </div>
      <LeaveRoom className="md:hidden" />
    </header>
  );
}
