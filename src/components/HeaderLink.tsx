import { twMerge } from "tailwind-merge";

type AnchorProps = {
  as?: undefined;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  as: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = { active?: boolean } & (AnchorProps | ButtonProps);

export function HeaderLink(props: Props) {
  const newClassName = twMerge(
    "cursor-pointer uppercase font-semibold text-sm flex items-center gap-1.5",
    props.className,
    props.active ? "text-white" : "text-slate-400 hover:text-slate-300"
  );

  if (props.as === "button") {
    return <button className={newClassName} {...props} />;
  }
  return <a className={newClassName} {...props} />;
}
