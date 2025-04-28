export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin?: string;
  github?: string;
  address: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string; // Consider using Date type later, string for simplicity now (YYYY-MM)
  endDate: string;   // 'Present' or YYYY-MM
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string; // Optional field for GPA, honors, etc.
}

export interface Skill {
  name: string;
  level?: string; // Optional proficiency level (e.g., Beginner, Intermediate, Advanced)
}

export interface Certification {
  name: string;
  issuingOrganization: string;
  date?: string; // Optional date (YYYY-MM)
}

export interface Language {
    name: string;
    proficiency: string; // e.g., Native, Fluent, Conversational
}

export interface Project {
  name: string;
  description: string;
  url?: string; // Optional link to project/repo
}

export interface CVData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
}


export const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
  },
  contactInfo: {
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    address: '',
  },
  professionalSummary: '',
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  projects: [],
};
