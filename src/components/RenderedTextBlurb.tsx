import Markdown from "react-markdown";
import { TextBlurb } from "../../data/types";

type Props = {
  blurb: TextBlurb;
};

function normalize(s: string) {
  return s.trim();
}

export function RenderedTextBlurb({ blurb }: Props) {
  return (
    <div className="flex flex-col">
      {blurb.sections.map((section) => (
        <div className="[&_p:not(:last-child)]:mb-2 leading-snug border-b last:border-b-0 py-4 first:pt-0 last:pb-0">
          <Markdown>{normalize(section)}</Markdown>
        </div>
      ))}
    </div>
  );
}
