import { Button } from "@/components/ui/button";
import Navbar from "./_components/Navbar";
import { Pencil } from "lucide-react";
import Image from "next/image";
import CheckText from "./_components/CheckText";
import { H1, H2, H3 } from "./_components/Headings";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
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
        <div className="w-full mt-24 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1440"
            height="54"
            viewBox="0 0 1440 54"
            fill="none"
          >
            <path
              d="M378.346 26.3353C448.43 31.6241 516.29 41.1038 586.18 46.8534C685.734 55.0489 789.409 55.544 888.807 47.0446C985.401 38.805 1085.56 18.7083 1181.01 8.49828C1265.65 -0.559911 1358.06 -4.29004 1440 7.02779V54H-10V40.5941C113.813 21.5492 248.116 16.6181 378.346 26.3353Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="bg-white flex flex-col items-center px-6">
          <H2 className="mt-12">What makes us unique?</H2>
          <p className="mt-4 text-gray-700">
            We offer the smoothest and safest chatting experience on the web.
          </p>
          <div className="mt-12 flex gap-12">
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6">
              <H3>Effortless Sharing</H3>
              <p className="text-gray-700 mt-4">
                Share short, simple links to invite anyone into your chatroom.
                No signups or extra steps—just click and chat.
              </p>
              <Image
                src="/images/sharing.svg"
                alt="sharing"
                className="mt-7 mx-auto drop-shadow"
                width={227}
                height={87}
              />
            </div>
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6">
              <H3>Complete Privacy</H3>
              <p className="text-gray-700 mt-4">
                Your conversations stay yours. All data is automatically erased
                when the chatroom expires, protecting your privacy.
              </p>
              <Image
                src="/images/shield.svg"
                alt="sharing"
                className="mt-4 mx-auto drop-shadow"
                width={101}
                height={114}
              />
            </div>
            <div
              className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6"
              id="features"
            >
              <H3>Easy Rejoining</H3>
              <p className="text-gray-700 mt-4">
                Accidentally closed the tab? No problem. Rejoin the same
                chatroom instantly with seamless tab recovery.
              </p>
              <Image
                src="/images/chatting.svg"
                alt="sharing"
                className="mt-4 mx-auto drop-shadow"
                width={203}
                height={111}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
