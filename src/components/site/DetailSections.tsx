import { BulletList } from "./Cards";
import { populatedProjectSectionKeys } from "@/data/projectSections";
import type { ProjectSectionKey, SectionContent } from "@/data/types";
import { pageCopy, projectSectionLabelsByLanguage } from "@/data/localization";
import type { Language } from "@/lib/language";

export function DetailSections({
  sections,
  language = "en",
}: {
  sections: Partial<Record<ProjectSectionKey, SectionContent>>;
  language?: Language;
}) {
  const labels = projectSectionLabelsByLanguage[language];
  const sectionKeys = populatedProjectSectionKeys(sections);

  return (
    <div className="space-y-12">
      {sectionKeys.map((key) => {
        const content = sections[key];
        return (
          <section key={key} id={key} aria-labelledby={`${key}-heading`}>
            <h2
              id={`${key}-heading`}
              className="border-b border-border pb-2 text-lg font-semibold text-foreground"
            >
              {labels[key]}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {content?.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {content?.bullets ? <BulletList items={content.bullets} /> : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function SectionNav({
  sections,
  language = "en",
}: {
  sections: Partial<Record<ProjectSectionKey, SectionContent>>;
  language?: Language;
}) {
  const copy = pageCopy[language].details;
  const labels = projectSectionLabelsByLanguage[language];
  const sectionKeys = populatedProjectSectionKeys(sections);

  return (
    <nav aria-label={copy.sections} className="hidden lg:block">
      <p className="eyebrow">{copy.onThisPage}</p>
      <ul className="mt-3 space-y-1.5">
        {sectionKeys.map((key) => (
          <li key={key}>
            <a href={`#${key}`} className="text-xs text-muted-foreground hover:text-foreground">
              {labels[key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
