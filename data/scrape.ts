import { promises as fs } from "fs";
import { JSDOM } from "jsdom";
import { AllComps, Comp, CompGroup, TextBlurb } from "./types";
import { find, findAll, orThrow, readFileIfExists } from "./utils";

const HANDBOOK_PAGE_CACHE = "tfthandbook.html";

async function getHandbookPage() {
  const data = await readFileIfExists(HANDBOOK_PAGE_CACHE);
  if (data) return data;

  const resp = await fetch("https://tfthandbook.com/");
  const htmlString = await resp.text();

  await fs.writeFile(HANDBOOK_PAGE_CACHE, htmlString);
  return htmlString;
}

// this is the .eael-accordion-list node
function parseComp(
  node: Element,
  headerImageLookup: Record<string, string>
): Comp {
  const name = find(node, ".eael-accordion-tab-title").textContent!;
  const diagramUrl = find(node, "img").getAttribute("src")!;

  const description: TextBlurb = { sections: [] };

  const descriptionNodes = Array.from(findAll(node, "p, .elementor-divider"));
  if (descriptionNodes.length !== 0) {
    while (descriptionNodes[0].classList.contains("elementor-divider")) {
      descriptionNodes.splice(0, 1);
    }

    const descriptionParts: string[][] = [[]];
    let part: string[] = descriptionParts[0];

    for (const it of descriptionNodes) {
      if (it.tagName === "P") {
        part.push(it.textContent!);
      } else {
        part = [];
        descriptionParts.push(part);
      }
    }

    description.sections = descriptionParts.map((it) => it.join("\n\n"));
  }

  const parent = node.closest(".e-loop-item") ?? orThrow("parent not found");
  const idMatch =
    parent.className.match(/e-loop-item-([0-9]+)/) ??
    orThrow("couldn't get parent id");
  const headerImageUrl = headerImageLookup[idMatch[1]];

  return { name, diagramUrl, description, headerImageUrl };
}

function parseCompsList(node: Element): AllComps {
  const styleNodes = findAll(node, "style");
  const headerImageLookup: Record<string, string> = {};

  styleNodes.forEach((it) => {
    const textContent = it.textContent ?? orThrow("shit fucked up");
    const idMatch = textContent.match(/\.e-loop-item-([0-9]+)/);
    const urlMatch = textContent.match(/url\("([^"]+)"\)/);

    if (idMatch && urlMatch) {
      headerImageLookup[idMatch[1]] = urlMatch[1];
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
      currentGroup!.comps.push(parseComp(it, headerImageLookup));
    }
  }

  return { groups };
}

async function main() {
  const htmlString = await getHandbookPage();
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
  const allComps = parseCompsList(compsListContentNode);

  await fs.writeFile("src/data.json", JSON.stringify(allComps, null, 2));
}

main();
