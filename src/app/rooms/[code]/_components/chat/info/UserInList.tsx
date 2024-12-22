export function UserInList({
  name,
  online,
}: {
  name: string;
  online: boolean;
}) {
  return (
    <li className="text-lg flex items-center gap-3">
      <div
        className={`h-2 w-2 ${
          online ? "bg-green-500" : "bg-gray-400"
        } rounded-full`}
      />
      <span className="text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap hover:whitespace-normal">
        {name}
      </span>
    </li>
  );
}
