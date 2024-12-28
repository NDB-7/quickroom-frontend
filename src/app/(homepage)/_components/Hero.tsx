import { Button } from "@/components/ui/button";
import CheckText from "./CheckText";
import { H1, H2 } from "./Headings";
import { Pencil } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="mt-16 flex flex-col items-center px-6">
      <H1 className="mt-12">Instant chatrooms, just a code away</H1>
      <p className="mt-6 text-center text-lg text-gray-700 max-w-3xl leading-relaxed">
        Create a chatroom in seconds with just a 4-digit code. Share it with
        your friends and start chatting instantly—no login required.
      </p>
      <form className="mt-10 relative home-input">
        <input
          type="text"
          maxLength={30}
          placeholder="Enter chatroom name here"
          className="border-gray-200 border-2 rounded-full py-2 px-6 shadow-sm w-full transition-all hover:border-gray-300 hover:shadow-gray-200"
        />
        <Button className="absolute right-1 top-1 rounded-full">
          <Pencil />
          Create
        </Button>
      </form>
      <div className="mt-24 flex flex-col items-center lg:flex-row lg:items-start lg:pl-16 gap-12 lg:gap-24 max-w-5xl w-full">
        <Image
          src="/images/imac.png"
          alt="Chatroom Example"
          width={468}
          height={387}
        />
        <div>
          <H2 className="mt-8">Getting started</H2>
          <div className="space-y-4 mt-6 lg:mt-8 sm:grid grid-cols-2 grid-rows-2 gap-x-8 lg:block">
            <CheckText text="Enter your chatroom name above." />
            <CheckText text="Click the button to get a link." />
            <CheckText text="Share it with your friends." />
            <CheckText text="Start chatting!" />
          </div>
        </div>
      </div>
      <img
        src="/images/big-gradient.svg"
        alt=""
        className="mt-32 -z-10 absolute"
      />
      <div className="absolute mt-72 w-full -z-10">
        <div className="bg-pattern h-80" />
        <div className="bg-pattern h-80" />
      </div>
    </div>
  );
}
