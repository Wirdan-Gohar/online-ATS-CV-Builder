'use client';
import type * as React from 'react';
import type { CVData } from '@/lib/types';
import { User, Phone, Mail, MapPin, Linkedin, Github, Briefcase, GraduationCap, Wrench, Award, Languages, FolderGit2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface TemplateProps {
    data: CVData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
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
        <div className="p-6 bg-background text-foreground font-sans text-sm">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-primary">{personalInfo.fullName}</h1>
                <p className="text-lg text-muted-foreground">{personalInfo.jobTitle}</p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-6 border-t border-b border-border py-2">
                {contactInfo.phone && <div className="flex items-center"><Phone className="w-3 h-3 mr-1 text-primary" /> {contactInfo.phone}</div>}
                {contactInfo.email && <div className="flex items-center"><Mail className="w-3 h-3 mr-1 text-primary" /> {contactInfo.email}</div>}
                {contactInfo.address && <div className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-primary" /> {contactInfo.address}</div>}
                {contactInfo.linkedin && <a href={contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline"><Linkedin className="w-3 h-3 mr-1" /> LinkedIn</a>}
                 {contactInfo.github && <a href={contactInfo.github.startsWith('http') ? contactInfo.github : `https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline"><Github className="w-3 h-3 mr-1" /> GitHub</a>}
            </div>

             {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 space-y-6">
                    {/* Professional Summary */}
                    {professionalSummary && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 border-b border-primary pb-1 flex items-center text-primary"><Briefcase className="w-4 h-4 mr-2" /> Summary</h2>
                            <p className="text-muted-foreground">{professionalSummary}</p>
                        </section>
                    )}


                    {/* Work Experience */}
                    {workExperience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 border-b border-primary pb-1 flex items-center text-primary"><Briefcase className="w-4 h-4 mr-2" /> Work Experience</h2>
                            <div className="space-y-4">
                                {workExperience.map((exp, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold">{exp.position}</h3>
                                        <p className="text-muted-foreground">{exp.company}</p>
                                        <p className="text-xs text-muted-foreground/80 mb-1">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                        <p className="text-muted-foreground whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                         <section>
                            <h2 className="text-lg font-semibold mb-2 border-b border-primary pb-1 flex items-center text-primary"><FolderGit2 className="w-4 h-4 mr-2" /> Projects</h2>
                             <div className="space-y-4">
                                {projects.map((proj, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold flex items-center">
                                            {proj.name}
                                            {proj.url && (
                                                <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline text-xs">
                                                    (Link)
                                                </a>
                                            )}
                                        </h3>
                                        <p className="text-muted-foreground whitespace-pre-line">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                 </div>

                 <div className="space-y-6">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 border-b border-primary pb-1 flex items-center text-primary"><GraduationCap className="w-4 h-4 mr-2" /> Education</h2>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold">{edu.degree}</h3>
                                        <p className="text-muted-foreground">{edu.institution}</p>
                                        <p className="text-xs text-muted-foreground/80">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                        {edu.description && <p className="text-xs text-muted-foreground mt-1">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}


                     {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 border-b border-primary pb-1 flex items-center text-primary"><Wrench className="w-4 h-4 mr-2" /> Skills</h2>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                {skills.map((skill, index) => (
                                    <li key={index}>{skill.name} {skill.level && `(${skill.level})`}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                     {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 border-b border-primary pb-1 flex items-center text-primary"><Award className="w-4 h-4 mr-2" /> Certifications</h2>
                            <div className="space-y-2">
                                {certifications.map((cert, index) => (
                                    <div key={index}>
                                        <p className="font-medium text-muted-foreground">{cert.name}</p>
                                        <p className="text-xs text-muted-foreground/80">{cert.issuingOrganization} {cert.date && ` - ${formatDate(cert.date)}`}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold mb-2 border-b border-primary pb-1 flex items-center text-primary"><Languages className="w-4 h-4 mr-2" /> Languages</h2>
                             <ul className="list-none text-muted-foreground space-y-1">
                                {languages.map((lang, index) => (
                                    <li key={index}>{lang.name} - {lang.proficiency}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                 </div>
            </div>
        </div>
    );
}
