export interface ResumeLanguage {
  name: string;
  level: string;
  evidence?: string;
}

export interface ResumeFrontmatter {
  name: string;
  headline: string;
  location: string;
  email: string;
  github: string;
  site: string;
  workRights?: string;
  languages: ResumeLanguage[];
}
