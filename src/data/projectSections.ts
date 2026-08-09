import { projectSectionOrder, type ProjectSectionKey, type SectionContent } from "./types.ts";

export function populatedProjectSectionKeys(
  sections: Partial<Record<ProjectSectionKey, SectionContent>>,
): ProjectSectionKey[] {
  return projectSectionOrder.filter((key) => {
    const content = sections[key];
    return Boolean(content?.paragraphs?.length || content?.bullets?.length);
  });
}
