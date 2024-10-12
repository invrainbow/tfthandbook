import { RenderedTextBlurb } from "@/components/RenderedTextBlurb";
import _compsData from "@/data.json";
import { AllComps, Comp } from "../../data/types";

const compsData: AllComps = _compsData;

function makeUniqueCompId(comp: Comp) {
  return "comp-" + comp.name.toLowerCase().replace(" ", "-");
}

function normalizeCompName(name: string) {
  let ret = name;
  if (ret.endsWith(" Reroll")) {
    // ret = ret.replace(" Reroll", "");
  }
  return ret;
}

export default function Home() {
  const onScroll = (comp: Comp) => {
    const el = document.getElementById(makeUniqueCompId(comp));
    if (el) {
      el.scrollIntoView({
        behavior: "smooth", // smooth scrolling
        block: "start", // align to the start of the container
        inline: "nearest", // align horizontally as needed
      });
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-auto py-6 px-4 flex flex-col gap-8 max-h-full overflow-auto">
        {compsData.groups.map(({ label, comps }, i) => (
          <div key={label} className="">
            <div className="font-semibold text-xs uppercase text-white/50 mb-2">
              {label} comps
            </div>
            <div className="flex flex-col gap-2.5">
              {comps.map((it) => (
                <div key={it.name} className="leading-none">
                  <button
                    onClick={() => onScroll(it)}
                    className="transition-all pl-1.5 border-l-2 border-l-transparent hover:border-l-neutral-300 cursor-pointer text-white/90"
                  >
                    {normalizeCompName(it.name)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 border-l max-h-full overflow-auto">
        <div className="flex flex-col">
          {compsData.groups.map(({ label, comps }, i) => (
            <div key={label} className="flex flex-col">
              <div className="border-y bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.03)_7px,transparent_7px,transparent_14px)]">
                <div className="font-semibold uppercase text-lg text-white p-6 rounded leading-none">
                  {label} Comps
                </div>
              </div>
              <div className="flex flex-col">
                {comps.map((it) => (
                  <div
                    key={makeUniqueCompId(it)}
                    id={makeUniqueCompId(it)}
                    className="flex flex-col lg:flex-row gap-4 p-6 border-t first:border-t-0"
                  >
                    <div className="flex-1 flex flex-col gap-6 lg:min-w-[300px]">
                      <div
                        className="text-2xl font-semibold text-white/90 rounded-lg bg-cover bg-center bg-no-repeat overflow-hidden"
                        style={{ backgroundImage: `url(${it.headerImageUrl})` }}
                      >
                        <div className="p-4 bg-gradient-to-r from-black/70 to-black/10">
                          {normalizeCompName(it.name)}
                        </div>
                      </div>
                      <div className="pl-1">
                        {it.description.sections.length === 0 ? (
                          <div className="bg-black/20 p-4 rounded-lg text-center border mt-1 text-white/40">
                            Unfortunately, Mr. RobinSongz did not write anything
                            for this comp.
                          </div>
                        ) : (
                          <RenderedTextBlurb blurb={it.description} />
                        )}
                      </div>
                    </div>
                    <div>
                      <a href={it.diagramUrl} target="_blank">
                        <img
                          className="lg:w-[700px] xl:w-[1024px] max-w-full rounded overflow-hidden shadow"
                          src={it.diagramUrl}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
