import Link from "next/link";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren<{
  href: string;
  className?: string;
  active?: boolean;
  external?: boolean;
}>;

export function HeaderLink({
  href,
  external,
  className,
  active,
  children,
}: Props) {
  const newClassName = twMerge(
    "cursor-pointer uppercase font-semibold text-sm flex items-center gap-1.5",
    className,
    active ? "text-white" : "text-slate-400 hover:text-slate-300"
  );

  if (external) {
    return (
      <a target="_blank" href={href} className={newClassName}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={newClassName}>
      {children}
    </Link>
  );
}
