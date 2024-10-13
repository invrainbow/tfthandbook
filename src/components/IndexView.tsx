import { handbookData } from "@/handbook";
import { BoxesIcon, ChevronsUpIcon, CrownIcon, LucideIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CompsListView } from "./CompsListView";
import { EarlyGameLevelingView } from "./EarlyGameLevelingView";
import { MetaStrategyView } from "./MetaStrategyView";

type Tab = "comps" | "meta" | "early_game_leveling";

type TabInfo = {
  tab: Tab;
  label: string;
  labelShort: string;
  icon: LucideIcon;
  iconClassName: string;
  stroke?: string;
};

const TAB_INFO: TabInfo[] = [
  {
    tab: "comps",
    label: "Comps List",
    labelShort: "Comps",
    icon: BoxesIcon,
    iconClassName: "w-6 h-6",
    stroke: "1",
  },
  {
    tab: "meta",
    label: "Meta Strategy",
    labelShort: "Meta",
    icon: CrownIcon,
    iconClassName: "w-5 h-5",
    stroke: "2",
  },
  {
    tab: "early_game_leveling",
    label: "Early Game Leveling",
    labelShort: "Early Game",
    icon: ChevronsUpIcon,
    iconClassName: "w-6 h-6",
    stroke: "3",
  },
];

export function IndexView() {
  const [currentTab, setCurrentTab] = useState<Tab>("comps");

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="border-b p-4 flex justify-center gap-8">
        {TAB_INFO.map(
          ({ tab, label, labelShort, icon: Icon, iconClassName, stroke }) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={twMerge(
                "cursor-pointer uppercase font-semibold text-sm flex items-center gap-1.5",
                tab === currentTab ? "text-white" : "text-slate-400"
              )}
            >
              <Icon
                className={twMerge(iconClassName, "")}
                strokeWidth={stroke}
                absoluteStrokeWidth
              />
              <span className="hidden md:inline-block">{label}</span>
              <span className="md:hidden">{labelShort}</span>
            </button>
          )
        )}
      </div>
      <div className="flex-1 min-h-0">
        {currentTab === "comps" && <CompsListView />}
        {currentTab === "meta" && <MetaStrategyView />}
        {currentTab === "early_game_leveling" && <EarlyGameLevelingView />}
      </div>
    </div>
  );
}
