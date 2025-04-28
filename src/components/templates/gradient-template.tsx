'use client';
import type * as React from 'react';
import type { CVData } from '@/lib/types';
import { User, Phone, Mail, MapPin, Linkedin, Github, Briefcase, GraduationCap, Wrench, Award, Languages, FolderGit2 } from 'lucide-react';

interface TemplateProps {
    data: CVData;
}

export function GradientTemplate({ data }: TemplateProps) {
    const { personalInfo, contactInfo, professionalSummary, workExperience, education, skills, certifications, languages, projects } = data;

    const formatDate = (dateStr: string): string => {
        if (!dateStr) return '';
        if (dateStr.toLowerCase() === 'present') return 'Present';
         try {
            const [year, month] = dateStr.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        } catch (e) {
            return dateStr; // Return original if parsing fails
        }
    }

    return (
        <div className="p-6 bg-gradient-to-br from-secondary via-background to-background text-foreground font-sans text-sm rounded-lg shadow-lg">
             {/* Header */}
            <div className="text-center mb-8 pb-4 border-b border-primary/30">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">{personalInfo.fullName}</h1>
                <p className="text-lg text-muted-foreground mt-1">{personalInfo.jobTitle}</p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground mb-8">
                 {contactInfo.phone && <div className="flex items-center"><Phone className="w-3 h-3 mr-1.5 text-primary" /> {contactInfo.phone}</div>}
                {contactInfo.email && <div className="flex items-center"><Mail className="w-3 h-3 mr-1.5 text-primary" /> {contactInfo.email}</div>}
                {contactInfo.address && <div className="flex items-center"><MapPin className="w-3 h-3 mr-1.5 text-primary" /> {contactInfo.address}</div>}
                {contactInfo.linkedin && <a href={contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline"><Linkedin className="w-3 h-3 mr-1.5" /> LinkedIn</a>}
                 {contactInfo.github && <a href={contactInfo.github.startsWith('http') ? contactInfo.github : `https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline"><Github className="w-3 h-3 mr-1.5" /> GitHub</a>}
            </div>

            {/* Main Content - Single Column Approach */}
            <div className="space-y-8">
                {/* Professional Summary */}
                {professionalSummary && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-primary flex items-center"><Briefcase className="w-5 h-5 mr-2" /> Professional Summary</h2>
                        <p className="text-muted-foreground">{professionalSummary}</p>
                    </section>
                )}

                 {/* Work Experience */}
                 {workExperience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-primary flex items-center"><Briefcase className="w-5 h-5 mr-2" /> Work Experience</h2>
                        <div className="space-y-5">
                            {workExperience.map((exp, index) => (
                                <div key={index} className="pl-4 border-l-2 border-primary/50">
                                    <h3 className="font-semibold text-base">{exp.position} <span className="text-muted-foreground font-normal">at {exp.company}</span></h3>
                                    <p className="text-xs text-muted-foreground/80 mb-1">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    <p className="text-muted-foreground whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                 {/* Education */}
                 {education.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3 text-primary flex items-center"><GraduationCap className="w-5 h-5 mr-2" /> Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="pl-4 border-l-2 border-primary/50">
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-muted-foreground">{edu.institution}</p>
                                    <p className="text-xs text-muted-foreground/80">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                     {edu.description && <p className="text-xs text-muted-foreground mt-1">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills, Certs, Languages, Projects - Side by Side if space allows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 text-primary flex items-center"><Wrench className="w-4 h-4 mr-2" /> Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                     <span key={index} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">{skill.name}{skill.level ? ` (${skill.level})` : ''}</span>
                                ))}
                            </div>
                        </section>
                    )}

                     {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                             <h2 className="text-lg font-semibold mb-2 text-primary flex items-center"><Award className="w-4 h-4 mr-2" /> Certifications</h2>
                             <div className="space-y-2">
                                {certifications.map((cert, index) => (
                                    <div key={index}>
                                        <p className="font-medium text-muted-foreground">{cert.name}</p>
                                        <p className="text-xs text-muted-foreground/80">{cert.issuingOrganization}{cert.date ? ` - ${formatDate(cert.date)}` : ''}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}


                     {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 text-primary flex items-center"><Languages className="w-4 h-4 mr-2" /> Languages</h2>
                            <ul className="list-none text-muted-foreground space-y-1">
                                {languages.map((lang, index) => (
                                    <li key={index}>{lang.name} - <span className="text-muted-foreground/80">{lang.proficiency}</span></li>
                                ))}
                            </ul>
                        </section>
                    )}

                     {/* Projects */}
                    {projects.length > 0 && (
                         <section>
                            <h2 className="text-lg font-semibold mb-2 text-primary flex items-center"><FolderGit2 className="w-4 h-4 mr-2" /> Projects</h2>
                             <div className="space-y-3">
                                {projects.map((proj, index) => (
                                    <div key={index}>
                                        <h3 className="font-medium flex items-center text-muted-foreground">
                                            {proj.name}
                                            {proj.url && (
                                                <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline text-xs">
                                                    (Link)
                                                </a>
                                            )}
                                        </h3>
                                        <p className="text-xs text-muted-foreground/80 whitespace-pre-line">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>


            </div>
        </div>
    );
}
