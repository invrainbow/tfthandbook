import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins, Inter } from "next/font/google";
import cx from "classnames";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cx("", poppins.className)}>
      <Component {...pageProps} />
    </div>
  );
}
