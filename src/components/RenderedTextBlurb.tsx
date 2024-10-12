import Markdown from "react-markdown";
import { TextBlurb } from "../../data/types";
import cx from "classnames";

type Props = {
  blurb: TextBlurb;
};

function normalize(s: string) {
  return s.trim();
}

export function RenderedTextBlurb({ blurb }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {blurb.sections.map((section) => (
        <div
          className={cx(
            "[&_p:not(:last-child)]:mb-2",
            "[&_p:not(:first-child)]:list-item [&_p:not(:first-child)]:list-disc [&_p:not(:first-child)]:ml-4 [&_p:not(:first-child)]:list-outside",
            "[&_p:not(:first-child)]:marker:text-white/50 [&_p:not(:first-child)]:marker:text-xs",
            "[&_p:first-child]:font-semibold [&_p:first-child]:text-white/90",
            "leading-snug"
          )}
        >
          <Markdown>{normalize(section)}</Markdown>
        </div>
      ))}
    </div>
  );
}
