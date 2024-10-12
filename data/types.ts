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

export type AllComps = {
  groups: CompGroup[];
};
