import type {
  LocalizedText,
  Project,
  ProjectDetailLevel,
  ProjectGroup,
  ProjectSectionKey,
  SectionContent,
  Status,
} from "../types.ts";

type LocalizedStrings = {
  en: string[];
  ko: string[];
};

type CareerProjectBase = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  client: string;
  period: string;
  periodLabel?: LocalizedText;
  affiliation?: LocalizedText;
  relatedBlog?: string;
  role: LocalizedText;
  group: Exclude<ProjectGroup, "platform">;
  technologies: string[];
  status?: Status;
};

type CompactCareerProject = CareerProjectBase & {
  scope: LocalizedStrings;
  checks: LocalizedStrings;
  failures?: LocalizedStrings;
};

type DeepCareerProject = CareerProjectBase & {
  sections: Record<string, LocalizedStrings>;
};

function localizedSections(
  sections: Record<string, LocalizedStrings>,
): Partial<Record<ProjectSectionKey, SectionContent>> {
  return Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [key, { bullets: value.ko }]),
  );
}

function englishSections(
  sections: Record<string, LocalizedStrings>,
): Partial<Record<ProjectSectionKey, SectionContent>> {
  return Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [key, { bullets: value.en }]),
  );
}

function projectBase(
  input: CareerProjectBase,
  detailLevel: ProjectDetailLevel,
  sections: Partial<Record<ProjectSectionKey, SectionContent>>,
  koreanSections: Partial<Record<ProjectSectionKey, SectionContent>>,
): Project {
  return {
    slug: input.slug,
    title: input.title.en,
    status: input.status ?? "Completed",
    summary: input.summary.en,
    technologiesLabel: "Technologies",
    technologies: input.technologies,
    client: input.client,
    period: input.period,
    ...(input.periodLabel ? { periodLabel: input.periodLabel } : {}),
    ...(input.affiliation ? { affiliation: input.affiliation } : {}),
    ...(input.relatedBlog ? { relatedBlog: input.relatedBlog } : {}),
    role: input.role,
    group: input.group,
    detailLevel,
    sections,
    localized: {
      ko: {
        title: input.title.ko,
        summary: input.summary.ko,
        technologiesLabel: "기술",
        sections: koreanSections,
      },
    },
  };
}

export function compactCareerProject(input: CompactCareerProject): Project {
  const sections: Record<string, LocalizedStrings> = {
    overview: {
      en: [input.summary.en],
      ko: [input.summary.ko],
    },
    implementation: input.scope,
    productionConsiderations: input.checks,
  };

  if (input.failures) sections["failureScenarios"] = input.failures;

  return projectBase(input, "compact", englishSections(sections), localizedSections(sections));
}

export function deepCareerProject(input: DeepCareerProject): Project {
  return projectBase(
    input,
    "deep",
    englishSections(input.sections),
    localizedSections(input.sections),
  );
}
