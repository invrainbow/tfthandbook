import { augments } from "@/handbook";
import { AugmentsTable } from "@/components/AugmentsTable";
import { FancyTitle } from "@/components/FancyTitle";

const STRONG_AUGMENTS = [
  {
    label: <span className="text-slate-400">Silver Augments</span>,
    items: augments.strongAugments.silverAugments,
  },
  {
    label: <span className="text-yellow-400">Gold Augments</span>,
    items: augments.strongAugments.goldAugments,
  },
  {
    label: <span className="text-purple-200">Prismatic Augments</span>,
    items: augments.strongAugments.prismaticAugments,
  },
];

const CHEATSHEET = [
  {
    label: (
      <div className="flex items-center justify-between">
        <div>Augment</div>
        <div>What to Play</div>
      </div>
    ),
    items: augments.flowChart.map((it) => (
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

export default function Augments() {
  return (
    <div className="h-full min-h-0 overflow-auto md:overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col md:grid md:grid-cols-2 p-4 md:p-6 gap-6 md:h-full">
        <div className="md:h-full border-r flex flex-col md:min-h-0 border rounded">
          <FancyTitle className="border-b">Strong Augments</FancyTitle>
          <div className="md:flex-1 md:min-h-0 md:overflow-auto">
            <AugmentsTable columns={STRONG_AUGMENTS} />
          </div>
        </div>
        <div className="md:h-full flex flex-col md:min-h-0 border rounded">
          <FancyTitle className="border-b">2-1 Augment Cheatsheet</FancyTitle>
          <div className="md:flex-1 md:min-h-0 md:overflow-auto">
            <AugmentsTable columns={CHEATSHEET} />
          </div>
        </div>
      </div>
    </div>
  );
}
