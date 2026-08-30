export interface CVLanguage {
  name: string;
  level: string;
  evidence?: string;
}

export interface CVFrontmatter {
  name: string;
  headline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  site: string;
  workRights?: string;
  languages: CVLanguage[];
}
