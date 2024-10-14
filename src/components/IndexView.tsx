import {
  BoxesIcon,
  ChevronsUpIcon,
  CrownIcon,
  GalleryHorizontalEndIcon,
  RectangleVerticalIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { useState } from "react";
import { CompsListView } from "./CompsListView";
import { EarlyGameLevelingView } from "./EarlyGameLevelingView";
import { HeaderLink } from "./HeaderLink";
import { MetaStrategyView } from "./MetaStrategyView";

type Tab = "comps" | "meta" | "early_game_leveling";

const MIDDLE_TABS = [
  {
    tab: "comps",
    label: "Comps",
    icon: <BoxesIcon className="w-6 h-6" strokeWidth="1" absoluteStrokeWidth />,
  },
  {
    tab: "meta",
    label: "Augments",
    icon: (
      <GalleryHorizontalEndIcon
        className="w-5 h-5"
        strokeWidth="2"
        absoluteStrokeWidth
      />
    ),
  },
  {
    tab: "early_game_leveling",
    label: "Leveling",
    icon: (
      <ChevronsUpIcon className="w-6 h-6" strokeWidth="3" absoluteStrokeWidth />
    ),
  },
];

const RIGHT_TABS = [
  {
    url: "https://github.com/invrainbow/tfthandbook",
    label: "Source",
  },
  {
    url: "https://tfthandbook.com",
    label: "Original",
  },
];

export function IndexView() {
  const [currentTab, setCurrentTab] = useState<Tab>("comps");

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="border-b py-4 px-5 grid grid-cols-1 gap-3 md:grid-cols-[400px_auto_400px] justify-between items-center">
        <div className="text-white text-base font-semibold flex justify-center md:justify-start items-center gap-2 md:gap-2.5 select-none pointer-events-none">
          <img
            className="block w-6 h-6 md:w-8 md:h-8 border border-red-700/80"
            src="/reforger.webp"
            alt=""
          />
          <span>RobinSongz TFT Handbook</span>
        </div>
        <div className="flex-1 flex gap-6 md:gap-8 items-center justify-center">
          {MIDDLE_TABS.map(({ tab, label, icon }) => (
            <HeaderLink
              as="button"
              active={currentTab === tab}
              key={tab}
              onClick={() => setCurrentTab(tab as Tab)}
            >
              {icon}
              <span>{label}</span>
            </HeaderLink>
          ))}
        </div>
        <div className="hidden md:flex gap-4 items-center justify-end">
          {RIGHT_TABS.map((it) => (
            <HeaderLink target="_blank" key={it.url} href={it.url}>
              {it.label}
              <SquareArrowOutUpRightIcon className="w-4 h-4 relative -top-px opacity-70" />
            </HeaderLink>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0">
        {currentTab === "comps" && <CompsListView />}
        {currentTab === "meta" && <MetaStrategyView />}
        {currentTab === "early_game_leveling" && <EarlyGameLevelingView />}
      </div>
    </div>
  );
}
