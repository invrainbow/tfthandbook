import { HeaderLink } from "@/components/HeaderLink";
import { Loading } from "@/components/Loading";
import { HandbookProvider } from "@/hooks/useHandbook";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BoxesIcon,
  ChevronsUpIcon,
  GalleryHorizontalEndIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import type { AppProps } from "next/app";
import { Kalam, Poppins } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

const mainFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const handwritingFont = Kalam({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["400"],
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

function Layout({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        "h-screen w-full flex flex-col",
        mainFont.className,
        handwritingFont.variable
      )}
    >
      <Head>
        <title>TFT Handbook</title>
      </Head>
      <div className="border-b py-4 px-5 grid grid-cols-1 gap-3 md:grid-cols-[400px_auto_400px] justify-between items-center">
        <Link
          href="/"
          className="text-white text-base font-semibold flex justify-center md:justify-start items-center gap-2 md:gap-2"
        >
          <span>RobinSongz TFT Handbook</span>
          <span className="hidden text-base -rotate-2 font-medium relative bottom-0.5 text-purple-200 font-handwriting">
            (revamped!)
          </span>
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

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HandbookProvider loadingView={<Loading />}>
        <Layout {...props} />
      </HandbookProvider>
    </QueryClientProvider>
  );
}
