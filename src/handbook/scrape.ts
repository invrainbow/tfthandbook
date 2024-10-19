import { kv } from "@vercel/kv";
import { JSDOM } from "jsdom";
import { NodeHtmlMarkdown } from "node-html-markdown";
import {
  Augments,
  Comp,
  CompGroup,
  Comps,
  FlowChartItem,
  Handbook,
  Leveling,
  TextBlurb,
} from "./types";
import { assert, find, findAll, orThrow } from "./utils";

export const HANDBOOK_DATA_KEY = "handbook_data_key";

function parseTextBlurb(node: Element): TextBlurb {
  const ret: TextBlurb = { sections: [] };

  const textNodes = Array.from(findAll(node, "p, .elementor-divider"));
  if (textNodes.length !== 0) {
    while (textNodes[0].classList.contains("elementor-divider")) {
      textNodes.splice(0, 1);
    }

    const descriptionParts: string[][] = [[]];
    let part: string[] = descriptionParts[0];

    for (const it of textNodes) {
      if (it.tagName === "P" && it.textContent) {
        const content = it.textContent.trim();
        if (content.length > 0) {
          part.push(content);
          continue;
        }
      }

      part = [];
      descriptionParts.push(part);
    }

    ret.sections = descriptionParts.map((it) => it.join("\n\n"));
  }

  return ret;
}

// this is the .eael-accordion-list node
function parseComp(node: Element, headerLookup: Record<string, string>): Comp {
  const name = find(node, ".eael-accordion-tab-title").textContent!;
  const diagramUrl = find(node, "img").getAttribute("src")!;
  const description = parseTextBlurb(node);

  const parent = node.closest(".e-loop-item") ?? orThrow("parent not found");
  const idMatch =
    parent.className.match(/e-loop-item-([0-9]+)/) ??
    orThrow("couldn't get parent id");
  const headerImageUrl = headerLookup[idMatch[1]];

  return { name, diagramUrl, description, headerImageUrl };
}

function parseCompsList(node: Element): Comps {
  const styleNodes = findAll(node, "style");
  const headerLookup: Record<string, string> = {};

  styleNodes.forEach((it) => {
    const textContent = it.textContent ?? orThrow("shit fucked up");
    const idMatch = textContent.match(/\.e-loop-item-([0-9]+)/);
    const urlMatch = textContent.match(/url\("([^"]+)"\)/);

    if (idMatch && urlMatch) {
      headerLookup[idMatch[1]] = urlMatch[1];
    }
  });

  const relevantNodes = Array.from(
    findAll(node, ".eael-accordion-list, .elementor-heading-title")
  );

  const groups: CompGroup[] = [];
  let currentGroup: CompGroup | null = null;

  for (const it of relevantNodes) {
    if (it.tagName === "H2") {
      const grandparent = it.parentElement?.parentElement;
      if (grandparent?.classList.contains("elementor-hidden-desktop")) {
        continue;
      }

      currentGroup = {
        label: it.textContent ?? "",
        comps: [],
      };

      groups.push(currentGroup);
    } else {
      // an h2 will always come first, so currentGroup will be set
      currentGroup!.comps.push(parseComp(it, headerLookup));
    }
  }

  return { groups };
}

function parseLeveling(node: Element): Leveling {
  const titleNodes = findAll(node, "h2.elementor-heading-title");
  const titleNode =
    Array.from(titleNodes).find(
      (it) => it.textContent === "Early Game Leveling"
    ) ?? orThrow("unable to find early game leveling title");

  const earlyGameLevelingNode =
    titleNode.closest(".e-n-tabs-content") ?? orThrow("unable to get content");

  const sectionNodes = findAll(earlyGameLevelingNode, ".eael-accordion-list");

  const sections = Array.from(sectionNodes).map((it) => {
    const stage =
      find(it, ".elementor-tab-title")?.textContent ??
      orThrow("couldn't find title");

    const contentNode =
      find(it, ".eael-accordion-content") ?? orThrow("couldn't find content");

    const content = NodeHtmlMarkdown.translate(contentNode.innerHTML);
    return { stage, content: { sections: [content] } };
  });

  return { sections };
}

function parseAugments(node: Element): Augments {
  const strategyNodes = Array.from(findAll(node, ".meta-strategy"));
  assert(strategyNodes.length === 2, `expected 2 strategy nodes`);

  const strongAugmentsNode = strategyNodes[0];

  const silverAugments: string[] = [];
  const goldAugments: string[] = [];
  const prismaticAugments: string[] = [];

  {
    const rowNodes = findAll(strongAugmentsNode, "tr");
    for (const it of Array.from(rowNodes).slice(1)) {
      const cellNodes = findAll(it, "td");
      assert(cellNodes.length === 3, "expected 3 cells per row");

      const silverAugment = cellNodes[0].textContent?.trim();
      const goldAugment = cellNodes[1].textContent?.trim();
      const prismaticAugment = cellNodes[2].textContent?.trim();

      if (silverAugment) silverAugments.push(silverAugment);
      if (goldAugment) goldAugments.push(goldAugment);
      if (prismaticAugment) prismaticAugments.push(prismaticAugment);
    }
  }

  const flowChartNode = strategyNodes[1];
  const flowChartItems: FlowChartItem[] = [];

  {
    const rowNodes = findAll(flowChartNode, "tr");
    for (const it of Array.from(rowNodes).slice(1)) {
      const cellNodes = findAll(it, "td");
      assert(cellNodes.length === 2, "expected 2 cells per row");

      const augment = cellNodes[0].textContent?.trim();
      const whatToPlay = cellNodes[1].textContent?.trim();

      if (augment && whatToPlay) {
        flowChartItems.push({ augment, whatToPlay });
      }
    }
  }

  return {
    strongAugments: { silverAugments, goldAugments, prismaticAugments },
    flowChart: flowChartItems,
  };
}

export async function fetchHandbookData() {
  const resp = await fetch("https://tfthandbook.com/");
  const htmlString = await resp.text();

  const document = new JSDOM(htmlString).window.document;

  const tabsContainerNode = find(document, ".e-n-tabs");

  const tabsHeadingNode = find(tabsContainerNode, ".e-n-tabs-heading");
  const tabTitleNodes = findAll(tabsHeadingNode, ".e-n-tab-title");

  const tabIdLookup: Record<string, string> = {};
  tabTitleNodes.forEach((it) => {
    const label = find(it, ".e-n-tab-title-text")
      .textContent!.trim()
      .toLowerCase();

    const tabId = it.getAttribute("id")!.slice("e-n-tabs-title-".length);
    tabIdLookup[label] = tabId;
  });

  const tabsContentNode = find(tabsContainerNode, ".e-n-tabs-content");

  const getTabContentNodeById = (tabName: string) =>
    find(tabsContentNode, `#e-n-tab-content-${tabIdLookup[tabName]}`);

  const compsListContentNode = getTabContentNodeById("comps list");
  const comps = parseCompsList(compsListContentNode);

  const metaStrategyContentNode = getTabContentNodeById("meta strategy");
  const augments = parseAugments(metaStrategyContentNode);

  const guidesContentNode = getTabContentNodeById("guides");
  const leveling = parseLeveling(guidesContentNode);

  const handbook: Handbook = { comps, augments, leveling };
  kv.set<Handbook>(HANDBOOK_DATA_KEY, handbook);
}
