import {
  BoxesIcon,
  ChevronsUpIcon,
  GalleryHorizontalEndIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { HeaderLink } from "@/components/HeaderLink";
import { useRouter } from "next/router";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const MIDDLE_TABS = [
  {
    href: "/comps",
    label: "Comps",
    icon: <BoxesIcon className="w-6 h-6" strokeWidth="1" absoluteStrokeWidth />,
  },
  {
    href: "/augments",
    label: "Augments",
    icon: <GalleryHorizontalEndIcon className="w-5 h-5" />,
  },
  {
    href: "/leveling",
    label: "Leveling",
    icon: (
      <ChevronsUpIcon className="w-6 h-6" strokeWidth="3" absoluteStrokeWidth />
    ),
  },
];

const RIGHT_TABS = [
  {
    url: "https://github.com/invrainbow/tfthandbook",
    label: "Source",
  },
  {
    url: "https://tfthandbook.com",
    label: "Original",
  },
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div
      className={twMerge("h-screen w-full flex flex-col", poppins.className)}
    >
      <div className="border-b py-4 px-5 grid grid-cols-1 gap-3 md:grid-cols-[400px_auto_400px] justify-between items-center">
        <Link
          href="/"
          className="text-white text-base font-semibold flex justify-center md:justify-start items-center gap-2 md:gap-2.5"
        >
          <img
            className="block size-6 md:size-6 border border-red-700/80"
            src="/reforger.webp"
            alt=""
          />
          <span>RobinSongz TFT Handbook</span>
        </Link>

        <div className="flex-1 flex gap-6 md:gap-8 items-center justify-center">
          {MIDDLE_TABS.map((it) => (
            <HeaderLink
              active={router.pathname === it.href}
              key={it.href}
              href={it.href}
            >
              {it.icon}
              <span>{it.label}</span>
            </HeaderLink>
          ))}
        </div>
        <div className="hidden md:flex gap-4 items-center justify-end">
          {RIGHT_TABS.map((it) => (
            <HeaderLink external key={it.url} href={it.url}>
              {it.label}
              <SquareArrowOutUpRightIcon className="w-4 h-4 relative -top-px opacity-70" />
            </HeaderLink>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
