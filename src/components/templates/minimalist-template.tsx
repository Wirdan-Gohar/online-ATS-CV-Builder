'use client';
import type * as React from 'react';
import type { CVData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

interface TemplateProps {
    data: CVData;
}

export function MinimalistTemplate({ data }: TemplateProps) {
    const { personalInfo, contactInfo, professionalSummary, workExperience, education, skills, certifications, languages, projects } = data;

     const formatDateRange = (startDateStr: string, endDateStr: string): string => {
        const formatSingleDate = (dateStr: string): string => {
            if (!dateStr) return '';
            if (dateStr.toLowerCase() === 'present') return 'Present';
            try {
                const [year, month] = dateStr.split('-');
                 // Just return Year for minimalist look
                return year;
                // const date = new Date(parseInt(year), parseInt(month) - 1);
                // return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            } catch (e) {
                return dateStr; // Return original if parsing fails
            }
        }
        const start = formatSingleDate(startDateStr);
        const end = formatSingleDate(endDateStr);
        if (start && end) return `${start} - ${end}`;
        if (start) return start;
        if (end) return end;
        return '';
    }

    const formatCertDate = (dateStr?: string): string => {
         if (!dateStr) return '';
         try {
            const [year, month] = dateStr.split('-');
            // Just return Year for minimalist look
            return year;
         } catch (e) {
             return dateStr;
         }
    }

    return (
        <div className="p-8 bg-background text-foreground font-serif text-sm leading-relaxed">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-light tracking-wider uppercase">{personalInfo.fullName}</h1>
                 {personalInfo.jobTitle && <p className="text-md font-light text-muted-foreground tracking-widest mt-1">{personalInfo.jobTitle}</p>}
            </div>

             {/* Contact Info - Minimal */}
             <div className="text-xs text-muted-foreground mb-8 space-x-4">
                 {contactInfo.email && <span>{contactInfo.email}</span>}
                 {contactInfo.phone && <span>{contactInfo.phone}</span>}
                 {contactInfo.address && <span>{contactInfo.address}</span>}
                 {contactInfo.linkedin && <a href={contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>}
                 {contactInfo.github && <a href={contactInfo.github.startsWith('http') ? contactInfo.github : `https://${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>}
             </div>

            <Separator className="my-6 bg-border/50"/>

            {/* Main Content Sections */}
            <div className="space-y-8">
                {/* Summary */}
                {professionalSummary && (
                    <section>
                        {/* No explicit header, context implies summary */}
                        <p>{professionalSummary}</p>
                    </section>
                )}

                {/* Experience */}
                {workExperience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Experience</h2>
                        <div className="space-y-4">
                            {workExperience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                         <h3 className="font-medium">{exp.position}</h3>
                                        <span className="text-xs text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate)}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm italic mb-1">{exp.company}</p>
                                    <p className="text-sm whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                         <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Education</h2>
                         <div className="space-y-3">
                            {education.map((edu, index) => (
                                <div key={index}>
                                     <div className="flex justify-between items-baseline">
                                        <h3 className="font-medium">{edu.degree}</h3>
                                        <span className="text-xs text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate)}</span>
                                     </div>
                                    <p className="text-muted-foreground text-sm italic">{edu.institution}</p>
                                     {edu.description && <p className="text-xs text-muted-foreground mt-1">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                 {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Skills</h2>
                        <p className="text-muted-foreground">
                            {skills.map(skill => skill.name).join(' · ')}
                        </p>
                    </section>
                )}


                 {/* Certifications */}
                {certifications.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Certifications</h2>
                         <div className="space-y-1">
                            {certifications.map((cert, index) => (
                                <p key={index} className="text-muted-foreground">
                                    {cert.name} <span className="italic">({cert.issuingOrganization}{cert.date ? `, ${formatCertDate(cert.date)}` : ''})</span>
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                 {/* Languages */}
                {languages.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Languages</h2>
                        <p className="text-muted-foreground">
                            {languages.map(lang => `${lang.name} (${lang.proficiency})`).join(' · ')}
                        </p>
                    </section>
                )}


                 {/* Projects */}
                 {projects.length > 0 && (
                    <section>
                         <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Projects</h2>
                         <div className="space-y-4">
                            {projects.map((proj, index) => (
                                <div key={index}>
                                    <h3 className="font-medium flex items-center">
                                        {proj.name}
                                        {proj.url && (
                                            <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline text-xs font-light">
                                                [Link]
                                            </a>
                                        )}
                                    </h3>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                 )}

            </div>
        </div>
    );
}
