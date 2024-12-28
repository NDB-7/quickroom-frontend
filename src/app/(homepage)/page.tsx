import Navbar from "./_components/Navbar";
import Image from "next/image";
import { H2, H3 } from "./_components/Headings";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
          <div className="mt-12 grid xl:grid-cols-3 md:grid-cols-2 gap-12">
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
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
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
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
              className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300"
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
              fill="#f9fafb"
            />
          </svg>
        </div>
        <div className="bg-gray-50 flex flex-col items-center px-6">
          <H2 className="mt-12">Frequently Asked Questions</H2>
          <p className="mt-4 text-gray-700">
            Any other questions? Feel free to contact us.
          </p>
          <div className="mt-12 grid xl:grid-cols-3 md:grid-cols-2 gap-12">
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
              <H3>How long does a chatroom stay active?</H3>
              <p className="text-gray-700 mt-4">
                Each chatroom stays active for an hour. This lightens the load
                on our servers and protects your privacy.
              </p>
              <Image
                src="/images/sharing.svg"
                alt="sharing"
                className="mt-7 mx-auto drop-shadow"
                width={227}
                height={87}
              />
            </div>
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
              <H3>What hapepns when the chatroom expires?</H3>
              <p className="text-gray-700 mt-4">
                All users are removed from the chatroom; user data and messages
                are erased from our servers.
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
              className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300"
              id="features"
            >
              <H3>Do I need to create an account?</H3>
              <p className="text-gray-700 mt-4">
                Not at all! Just enter the chatroom link, pick a name, and begin
                chatting away!
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
