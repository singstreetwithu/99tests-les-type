export type TestMode = 'quick' | 'full';

export type ArchetypeKey =
  | 'wrench'
  | 'sweetP'
  | 'auraT'
  | 'gentleSis'
  | 'versatileH'
  | 'puppy';

export type DimensionKey = 'warmth' | 'control' | 'intensity' | 'openness';

export type OptionLabel = 'A' | 'B' | 'C';

export type WeightedScores = {
  archetypes: Partial<Record<ArchetypeKey, number>>;
  dimensions: Partial<Record<DimensionKey, number>>;
};

export type QuestionOption = {
  label: OptionLabel;
  text: string;
  weights: WeightedScores;
};

export type Question = {
  id: string;
  prompt: string;
  options: [QuestionOption, QuestionOption, QuestionOption];
};

export type AnswerRecord = {
  questionId: string;
  optionIndex: number;
};

export type ResultProfile = {
  key: ArchetypeKey;
  name: string;
  code: string;
  oneLiner: string;
  hook: string;
  taglines: string[];
  bestMatch: ArchetypeKey;
  worstMatch: ArchetypeKey;
};

export type ReportSection = {
  id: string;
  icon: string;
  title: string;
  content: string;
};

export type TestAnalysis = {
  mode: TestMode;
  profile: ResultProfile;
  secondaryProfile: ResultProfile;
  attractionScore: number;
  archetypeScores: Record<ArchetypeKey, number>;
  dimensions: Record<DimensionKey, number>;
  summary: string;
  hookLine: string;
  topTraits: string[];
  matchSummary: string;
  clashSummary: string;
  sections: ReportSection[];
};

export type AppView = 'home' | 'quiz' | 'loading' | 'result';

export type PersistedSession = {
  view: AppView;
  mode: TestMode | null;
  answers: AnswerRecord[];
  currentIndex: number;
  result: TestAnalysis | null;
};
