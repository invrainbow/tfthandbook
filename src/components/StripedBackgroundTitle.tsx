import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLProps<HTMLDivElement>;

export function StripedBackgroundTitle({ className, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.03)_7px,transparent_7px,transparent_14px)]",
        "font-semibold uppercase text-base md:text-lg text-white p-4 md:px-6 md:py-5 leading-none",
        className
      )}
      {...rest}
    />
  );
}
