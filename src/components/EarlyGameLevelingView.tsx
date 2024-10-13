import { StripedBackgroundTitle } from "@/components/StripedBackgroundTitle";
import { earlyGameLeveling } from "@/handbook";
import Markdown from "react-markdown";
import { twMerge } from "tailwind-merge";

export function EarlyGameLevelingView() {
  return (
    <div className="h-full w-full overflow-auto min-h-0">
      <div className="flex flex-col">
        {earlyGameLeveling.sections.map((it) => (
          <>
            <StripedBackgroundTitle className="border-y first:border-t-0">
              <div className="max-w-screen-sm mx-auto">{it.stage}</div>
            </StripedBackgroundTitle>
            <div className="p-4 md:p-6">
              <div
                className={twMerge(
                  "flex flex-col gap-4 max-w-screen-sm mx-auto",
                  "[&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-6"
                )}
              >
                {it.content.sections.map((section) => (
                  <Markdown>{section}</Markdown>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
