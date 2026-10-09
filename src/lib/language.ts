import { createContext, useContext, useEffect } from "react";

export type Language = "ko" | "en";

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageContext");
  }

  return context;
}

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    document
      .querySelectorAll('meta[property="og:title"]')
      .forEach((meta) => meta.setAttribute("content", title));
    if (description) {
      document
        .querySelectorAll('meta[name="description"], meta[property="og:description"]')
        .forEach((meta) => meta.setAttribute("content", description));
    }
  }, [title, description]);
}
