import Link from "next/link";

export default function ChatroomLoading() {
  return (
    <div className="flex flex-col mt-8 text-2xl items-center">
      <h1>
        This chatroom doesn't exist.{" "}
        <Link href="/" className="underline hover:text-gray-600">
          Return to home.
        </Link>
      </h1>
    </div>
  );
}
