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

export type Comps = {
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

export type Augments = {
  strongAugments: StrongAugments;
  flowChart: FlowChartItem[];
};

export type LevelingSection = {
  stage: string;
  content: TextBlurb;
};

export type Leveling = {
  sections: LevelingSection[];
};

export type Handbook = {
  comps: Comps;
  augments: Augments;
  leveling: Leveling;
};
