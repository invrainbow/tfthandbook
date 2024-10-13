type MarkdownText = string;

export type TextBlurb = {
  sections: MarkdownText[];
};

export type Comp = {
  name: string;
  diagramUrl: string;
  description: TextBlurb;
  headerImageUrl: string;
};

export type CompGroup = {
  label: string;
  comps: Comp[];
};

export type CompsList = {
  groups: CompGroup[];
};

export type StrongAugments = {
  silverAugments: string[];
  goldAugments: string[];
  prismaticAugments: string[];
};

export type FlowChartItem = {
  augment: string;
  whatToPlay: string;
};

export type MetaStrategy = {
  strongAugments: StrongAugments;
  flowChart: FlowChartItem[];
};

export type EarlyGameLevelingSection = {
  stage: string;
  content: TextBlurb;
};

export type EarlyGameLeveling = {
  sections: EarlyGameLevelingSection[];
};

export type HandbookData = {
  compsList: CompsList;
  metaStrategy: MetaStrategy;
  earlyGameLeveling: EarlyGameLeveling;
};
