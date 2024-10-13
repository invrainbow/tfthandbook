import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  augments: string[];
  labelClassName?: string;
};

export function AugmentsList({ label, augments, labelClassName }: Props) {
  return (
    <div>
      <div
        className={twMerge(
          "uppercase text-sm md:text-base font-semibold mb-4",
          labelClassName
        )}
      >
        {label}
      </div>
      <div className="space-y-2 leading-snug">
        {augments.map((it) => (
          <div key={it}>{it}</div>
        ))}
      </div>
    </div>
  );
}
