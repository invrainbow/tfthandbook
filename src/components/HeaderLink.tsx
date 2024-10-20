import Link from "next/link";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren & {
  href: string;
  className?: string;
  active?: boolean;
  external?: boolean;
};

export function HeaderLink({
  href,
  external,
  className,
  active,
  children,
}: Props) {
  const props = {
    href,
    className: twMerge(
      "cursor-pointer uppercase font-semibold text-sm flex items-center gap-1.5",
      className,
      active ? "text-white" : "text-slate-400 hover:text-slate-300"
    ),
    children,
  };

  return external ? <a target="_blank" {...props} /> : <Link {...props} />;
}
