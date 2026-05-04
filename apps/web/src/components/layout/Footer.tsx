import Image from "next/image";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="w-full bg-surface py-4 flex flex-col items-center gap-2 mx-auto text-sm text-muted-foreground">
      <Image src={logo}
        alt="Logo"
        width={100}
        priority
        className="opacity-80 mix-blend-multiply"
      />
      <p className="tracking-wide">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Ivy&apos;s Beauty | 以溫柔對待每一位客人。
      </p>
    </footer>
  );
}
