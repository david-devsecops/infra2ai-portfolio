export type Status = "Completed" | "In Progress" | "Planned" | "Case Study";

/** Ordered detail sections shown on a project page. */
export const projectSectionOrder = [
  "overview",
  "problem",
  "stakeholders",
  "requirements",
  "architecture",
  "designDecisions",
  "technologySelection",
  "implementation",
  "deployment",
  "observability",
  "failureScenarios",
  "troubleshooting",
  "tradeOffs",
  "productionConsiderations",
  "currentStatus",
  "demo",
  "repository",
  "lessonsLearned",
] as const;

export type ProjectSectionKey = (typeof projectSectionOrder)[number];

export const projectSectionLabels: Record<ProjectSectionKey, string> = {
  overview: "Overview",
  problem: "Problem",
  stakeholders: "Users / Stakeholders",
  requirements: "Requirements",
  architecture: "Architecture",
  designDecisions: "Design Decisions",
  technologySelection: "Technology Selection",
  implementation: "Implementation",
  deployment: "Deployment",
  observability: "Observability",
  failureScenarios: "Failure Scenarios",
  troubleshooting: "Troubleshooting",
  tradeOffs: "Trade-offs",
  productionConsiderations: "Production Considerations",
  currentStatus: "Current Status",
  demo: "Demo",
  repository: "GitHub Repository",
  lessonsLearned: "Lessons Learned",
};

/** A section body: paragraphs and/or bullet lists. Omit a key to render a placeholder. */
export type SectionContent = {
  paragraphs?: string[];
  bullets?: string[];
};

export type ProjectGroup = "cloud-security" | "oracle-data" | "unix-storage" | "platform";
export type ProjectDetailLevel = "deep" | "compact" | "planned";

export type ProjectLocalizedCopy = {
  title: string;
  summary: string;
  technologiesLabel?: string;
  sections: Partial<Record<ProjectSectionKey, SectionContent>>;
};

export type Project = {
  slug: string;
  title: string;
  status: Status;
  summary: string;
  /** Technologies used, or planned when the project is not started yet. */
  technologies: string[];
  technologiesLabel?: string;
  featured?: boolean;
  areas?: string[];
  client?: string;
  period?: string;
  role?: LocalizedText;
  group: ProjectGroup;
  detailLevel: ProjectDetailLevel;
  localized?: Partial<Record<"ko", ProjectLocalizedCopy>>;
  sections: Partial<Record<ProjectSectionKey, SectionContent>>;
};

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  status: Status;
  context: string;
  role: string;
  constraints: string[];
  keyActions: string[];
  result: string;
  technologies: string[];
  areas?: string[];
  /** Optional deeper write-up; when absent the detail page shows placeholders. */
  sections?: Partial<Record<ProjectSectionKey, SectionContent>>;
};

export type ArchitectureArea = {
  id: string;
  title: string;
  status: Status;
  description: string;
  practices: string[];
  relatedProjects?: string[];
  relatedCaseStudies?: string[];
};

export type LocalizedText = {
  ko: string;
  en: string;
};

export type BlogBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "code"; language: string; code: string; caption?: string }
  | { kind: "figure"; src: string; alt: string; caption: string };

export type BlogSection = {
  id: string;
  title: string;
  blocks: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  series: LocalizedText;
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  englishAbstract: string[];
  client?: string;
  project?: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  technologies: string[];
  sections: BlogSection[];
};
