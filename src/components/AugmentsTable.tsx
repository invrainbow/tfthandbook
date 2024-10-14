import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type Column = {
  label: ReactNode;
  items: ReactNode[];
};

type Props = {
  columns: Column[];
};

export function AugmentsTable({ columns }: Props) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 h-full md:flex-1 md:min-h-0 md:overflow-auto",
        columns.length === 2 && "md:grid-cols-2",
        columns.length === 3 && "md:grid-cols-3"
      )}
    >
      {columns.map((it, i) => (
        <div key={i} className="md:border-r last:border-r-0 relative">
          <div
            className={twMerge(
              "text-sm uppercase font-semibold leading-none py-3 px-3 md:sticky md:top-0 bg-background text-white whitespace-nowrap overflow-hidden text-ellipsis",
              "border-y md:border-t-0",
              i === 0 && "border-t-0"
            )}
          >
            {it.label}
          </div>
          <div className="leading-snug">
            {it.items.map((item, i) => (
              <div
                className={twMerge(
                  "py-2 px-3 whitespace-nowrap overflow-hidden text-ellipsis even:bg-white/5"
                  // !noRowStyling && "border-b last:border-b-0 md:last:border-b"
                )}
                key={i}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
