"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Pencil } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";

export default function CreateRoom() {
  const [userInput, setUserInput] = useState("");
  const [code, setCode] = useState();
  const [isError, setIsError] = useState(false);
  const [pending, startTransition] = useTransition();

  function submitHandler(e: FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/rooms",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: userInput }),
          }
        );

        const { success, code } = await response.json();
        if (success) setCode(code);
        else setIsError(true);
      } catch {
        setIsError(true);
      }
    });
  }
  if (!code)
    return (
      <div className="space-y-1">
        <form className="mt-10 relative home-input" onSubmit={submitHandler}>
          <input
            type="text"
            maxLength={30}
            placeholder="Enter chatroom name here"
            className="border-gray-200 border-2 rounded-full py-2 px-6 shadow-sm w-full transition-all hover:border-gray-300 hover:shadow-gray-200"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            required
          />
          <Button
            className="absolute right-1 top-1 rounded-full"
            disabled={pending}
          >
            {pending ? (
              <>
                <LoaderCircle className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Pencil />
                Create
              </>
            )}
          </Button>
        </form>
        {isError && (
          <div className="text-destructive pl-6">
            There was an error creating your chatroom, try again.
          </div>
        )}
      </div>
    );
  else
    return (
      <p className="mt-10 border-gray-200 border-2 rounded-md scale-125 py-2 px-6 shadow-sm">
        Here&apos;s your chatroom!
        <Link
          href={`/rooms/${code}`}
          className="underline ml-2"
        >{`${window.location.href}rooms/${code}`}</Link>
      </p>
    );
}
