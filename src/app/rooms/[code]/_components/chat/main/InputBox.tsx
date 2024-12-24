import { useState } from "react";
import { SessionType } from "../../../types";
import socket from "../../../socket";
import { SendHorizontal } from "lucide-react";
import RateLimitedDialog from "../../dialogs/RateLimitedDialog";

export default function InputBox({ session }: { session: SessionType }) {
  const [messageInput, setMessageInput] = useState("");
  const [rateLimited, setRateLimited] = useState(false);

  function handleMessageInput() {
    if (messageInput !== "")
      socket.emit(
        "sendMessage",
        messageInput,
        session,
        (rateLimited: boolean) => setRateLimited(rateLimited)
      );
    setMessageInput("");
  }

  return (
    <>
      <RateLimitedDialog
        open={rateLimited}
        close={() => setRateLimited(false)}
      />
      <div className="sticky bottom-0 w-full p-3">
        <form
          className="flex items-center h-12 rounded-full bg-gray-50 justify-between border-2 border-gray-200"
          onSubmit={e => e.preventDefault()}
        >
          <input
            className="ml-6 bg-transparent w-full outline-none pr-2"
            placeholder="Type a message..."
            aria-label="Message input box"
            maxLength={1000}
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
          />
          <button
            className="bg-cyan-500 h-5/6 aspect-square rounded-full mr-1 flex items-center justify-center"
            onClick={handleMessageInput}
          >
            <SendHorizontal className="w-7/12 h-7/12 stroke-white" />
          </button>
        </form>
      </div>
    </>
  );
}
