"use client";
import { LogOut, Pencil, SendHorizonal } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  return (
    <div className="fixed flex w-full h-full">
      <div className="hidden md:w-60 lg:w-72 h-full bg-gray-50 border-r-2 md:block relative">
        <div className="p-4 space-y-4 overflow-y-scroll">
          <p className="uppercase tracking-wider text-gray-700">
            Online Users - 3
          </p>
          <div className="space-y-2">
            <div className="text-lg flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-gray-800">Michael Jackson</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-12 border-t-2 flex items-center bg-gray-50">
          <div className="w-full flex justify-between items-center p-4">
            <span className="text-lg">Nathan</span>
            <Pencil />
          </div>
        </div>
      </div>
      <div className="h-full flex-grow relative">
        <div className="bg-white w-full border-b-2 py-2 px-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Chatroom Name</h1>
            <p className="text-sm text-gray-500">Expires in 53:31</p>
          </div>
          <Link href="/" aria-label="Leave Room">
            <LogOut />
          </Link>
        </div>
        <div className="overflow-y-scroll px-4 py-2 space-y-4">
          <div className="space-y-1">
            <p className="text-gray-800">Nathan</p>
            <p className="bg-cyan-100 rounded-lg max-w-xl inline-block py-1 px-2 shadow-sm">
              hey man what's up... how are you doin today?
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600">Michael Jackson</p>
            <p className="bg-gray-50 rounded-lg max-w-xl inline-block py-1 px-2 shadow-sm">
              Just beat it, beat it!
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-3">
          <div className="flex items-center h-12 rounded-full bg-gray-50 justify-between border-2 border-gray-200">
            <input
              className="ml-6 bg-transparent w-full outline-none pr-2"
              placeholder="Type a message..."
              aria-label="Message input box"
            ></input>
            <button className="bg-cyan-500 h-5/6 aspect-square rounded-full mr-1 flex items-center justify-center">
              <SendHorizonal className="w-7/12 h-7/12 stroke-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
