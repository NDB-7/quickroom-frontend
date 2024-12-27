import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <nav className="border-b-2  border-gray-200 fixed w-full h-16">
      <ul className="max-w-7xl h-full mx-auto px-6 flex items-center">
        <li>
          <Link href="/">
            <Image
              src="/images/LogoFull.svg"
              alt="logo"
              width={173}
              height={30}
            />
          </Link>
        </li>
        <div className="ml-auto flex items-center gap-8">
          <li className="hover-link">
            <Link href="#features">Features</Link>
          </li>
          <li className="hover-link">
            <Link href="#faq">FAQ</Link>
          </li>
          <li className="hover-link">
            <Link href="#contact">Contact</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
