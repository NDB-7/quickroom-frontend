import { UserInList } from "./UserInList";
import LeaveRoom from "./LeaveRoom";

export function Sidebar({
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
      <div className="absolute bottom-0 w-full h-16 border-t-2 flex items-center justify-between bg-gray-50 p-6 text-lg">
        <span className="">{currentUser}</span>
        <LeaveRoom className="hidden md:block" />
      </div>
    </aside>
  );
}
