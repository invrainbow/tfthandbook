import { metaStrategy } from "@/handbook";
import { Column, MetaStrategyTable } from "./MetaStrategyTable";
import { StripedBackgroundTitle } from "./StripedBackgroundTitle";

export function MetaStrategyView() {
  const augmentsList: Column[] = [
    {
      label: <span className="text-slate-400">Silver Augments</span>,
      items: metaStrategy.strongAugments.silverAugments,
    },
    {
      label: <span className="text-yellow-400">Gold Augments</span>,
      items: metaStrategy.strongAugments.goldAugments,
    },
    {
      label: <span className="text-purple-200">Prismatic Augments</span>,
      items: metaStrategy.strongAugments.prismaticAugments,
    },
  ];

  const whatToPlay: Column[] = [
    {
      label: (
        <div className="flex items-center justify-between">
          <div>Augment</div>
          <div>What to Play</div>
        </div>
      ),
      items: metaStrategy.flowChart.map((it) => (
        <div className="flex items-center gap-4">
          <div className="max-w-[50%] whitespace-nowrap overflow-hidden text-ellipsis">
            {it.augment}
          </div>
          <div className="flex-1">
            <div className="w-full border-t border-dashed border-white/30" />
          </div>
          <div className="max-w-[50%] whitespace-nowrap overflow-hidden text-ellipsis text-right">
            {it.whatToPlay}
          </div>
        </div>
      )),
    },
  ];

  return (
    <div className="h-full min-h-0 overflow-auto md:overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col md:grid md:grid-cols-2 p-4 md:p-6 gap-6 md:h-full">
        <div className="md:h-full border-r flex flex-col md:min-h-0 border rounded">
          <StripedBackgroundTitle className="border-b">
            Strong Augments
          </StripedBackgroundTitle>
          <div className="md:flex-1 md:min-h-0 md:overflow-auto">
            <MetaStrategyTable columns={augmentsList} />
          </div>
        </div>
        <div className="md:h-full flex flex-col md:min-h-0 border rounded">
          <StripedBackgroundTitle className="border-b">
            2-1 Augment Cheatsheet
          </StripedBackgroundTitle>
          <div className="md:flex-1 md:min-h-0 md:overflow-auto">
            <MetaStrategyTable columns={whatToPlay} noRowStyling />
          </div>
        </div>
      </div>
    </div>
  );
}
