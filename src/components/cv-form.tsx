'use client';

import type * as React from 'react';
import type { CVData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { User, Phone, Mail, MapPin, Briefcase, GraduationCap, Wrench, Award, Languages as LanguagesIcon, FolderGit2, PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';


interface CVFormProps {
  cvData: CVData;
  onInputChange: (section: keyof CVData, index: number | null, field: string, value: any) => void;
  onAddItem: (section: keyof CVData) => void;
  onRemoveItem: (section: keyof CVData, index: number) => void;
}

export function CVForm({ cvData, onInputChange, onAddItem, onRemoveItem }: CVFormProps) {

  const handleNestedChange = (section: keyof CVData, field: string, value: string) => {
    onInputChange(section, null, field, value);
  };

  const handleListChange = (section: keyof CVData, index: number, field: string, value: string) => {
     onInputChange(section, index, field, value);
  };

  return (
    <form className="space-y-6">
      <Accordion type="multiple" defaultValue={['personal-info', 'contact-info']} className="w-full">
        {/* Personal Information */}
        <AccordionItem value="personal-info">
          <AccordionTrigger className="text-lg font-medium">
            <User className="mr-2 h-5 w-5 text-primary" /> Personal Information
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={cvData.personalInfo.fullName} onChange={(e) => handleNestedChange('personalInfo', 'fullName', e.target.value)} placeholder="e.g., John Doe" />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title / Profession</Label>
              <Input id="jobTitle" value={cvData.personalInfo.jobTitle} onChange={(e) => handleNestedChange('personalInfo', 'jobTitle', e.target.value)} placeholder="e.g., Software Engineer" />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Contact Information */}
        <AccordionItem value="contact-info">
          <AccordionTrigger className="text-lg font-medium">
             <Phone className="mr-2 h-5 w-5 text-primary" /> Contact Information
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={cvData.contactInfo.phone} onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)} placeholder="e.g., +1 123-456-7890"/>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={cvData.contactInfo.email} onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)} placeholder="e.g., john.doe@example.com" />
            </div>
             <div>
               <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
               <Input id="linkedin" value={cvData.contactInfo.linkedin || ''} onChange={(e) => handleNestedChange('contactInfo', 'linkedin', e.target.value)} placeholder="e.g., linkedin.com/in/johndoe" />
            </div>
             <div>
               <Label htmlFor="github">GitHub Profile URL</Label>
               <Input id="github" value={cvData.contactInfo.github || ''} onChange={(e) => handleNestedChange('contactInfo', 'github', e.target.value)} placeholder="e.g., github.com/johndoe" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={cvData.contactInfo.address} onChange={(e) => handleNestedChange('contactInfo', 'address', e.target.value)} placeholder="e.g., 123 Main St, Anytown, USA" />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Professional Summary */}
        <AccordionItem value="summary">
            <AccordionTrigger className="text-lg font-medium">
                <Briefcase className="mr-2 h-5 w-5 text-primary" /> Professional Summary
            </AccordionTrigger>
            <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
                 <div>
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea id="summary" value={cvData.professionalSummary} onChange={(e) => onInputChange('professionalSummary', null, '', e.target.value)} placeholder="Write a brief summary about your professional background..." rows={4} />
                </div>
            </AccordionContent>
        </AccordionItem>


        {/* Work Experience */}
        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-medium">
            <Briefcase className="mr-2 h-5 w-5 text-primary" /> Work Experience
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
            {cvData.workExperience.map((exp, index) => (
              <Card key={index} className="mb-4 border border-border shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                     <CardTitle className="text-base font-medium">Experience #{index + 1}</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => onRemoveItem('workExperience', index)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove Experience</span>
                        </Button>
                 </CardHeader>
                 <CardContent className="space-y-3 pt-2">
                    <div>
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input id={`company-${index}`} value={exp.company} onChange={(e) => handleListChange('workExperience', index, 'company', e.target.value)} placeholder="Company Name"/>
                    </div>
                    <div>
                      <Label htmlFor={`position-${index}`}>Position</Label>
                      <Input id={`position-${index}`} value={exp.position} onChange={(e) => handleListChange('workExperience', index, 'position', e.target.value)} placeholder="Job Title"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <Label htmlFor={`exp-startDate-${index}`}>Start Date</Label>
                        <Input id={`exp-startDate-${index}`} type="month" value={exp.startDate} onChange={(e) => handleListChange('workExperience', index, 'startDate', e.target.value)} />
                        </div>
                        <div>
                        <Label htmlFor={`exp-endDate-${index}`}>End Date (or Present)</Label>
                        <Input id={`exp-endDate-${index}`} type="month" value={exp.endDate} onChange={(e) => handleListChange('workExperience', index, 'endDate', e.target.value)} placeholder="Present"/>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor={`exp-description-${index}`}>Description / Responsibilities</Label>
                        <Textarea id={`exp-description-${index}`} value={exp.description} onChange={(e) => handleListChange('workExperience', index, 'description', e.target.value)} placeholder="Describe your role and achievements..." rows={3}/>
                    </div>
                 </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => onAddItem('workExperience')} className="w-full">
               <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-medium">
            <GraduationCap className="mr-2 h-5 w-5 text-primary" /> Education
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
            {cvData.education.map((edu, index) => (
              <Card key={index} className="mb-4 border border-border shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                     <CardTitle className="text-base font-medium">Education #{index + 1}</CardTitle>
                     <Button variant="ghost" size="icon" onClick={() => onRemoveItem('education', index)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove Education</span>
                        </Button>
                 </CardHeader>
                 <CardContent className="space-y-3 pt-2">
                    <div>
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input id={`institution-${index}`} value={edu.institution} onChange={(e) => handleListChange('education', index, 'institution', e.target.value)} placeholder="University/School Name"/>
                    </div>
                    <div>
                        <Label htmlFor={`degree-${index}`}>Degree / Field of Study</Label>
                        <Input id={`degree-${index}`} value={edu.degree} onChange={(e) => handleListChange('education', index, 'degree', e.target.value)} placeholder="e.g., B.S. in Computer Science" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <Label htmlFor={`edu-startDate-${index}`}>Start Date</Label>
                        <Input id={`edu-startDate-${index}`} type="month" value={edu.startDate} onChange={(e) => handleListChange('education', index, 'startDate', e.target.value)} />
                        </div>
                        <div>
                        <Label htmlFor={`edu-endDate-${index}`}>End Date (or Expected)</Label>
                        <Input id={`edu-endDate-${index}`} type="month" value={edu.endDate} onChange={(e) => handleListChange('education', index, 'endDate', e.target.value)} />
                        </div>
                    </div>
                     <div>
                        <Label htmlFor={`edu-description-${index}`}>Notes / Achievements (Optional)</Label>
                        <Textarea id={`edu-description-${index}`} value={edu.description || ''} onChange={(e) => handleListChange('education', index, 'description', e.target.value)} placeholder="e.g., Graduated with honors, relevant coursework..." rows={2}/>
                    </div>
                 </CardContent>
               </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => onAddItem('education')} className="w-full">
               <PlusCircle className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

         {/* Skills */}
        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-medium">
             <Wrench className="mr-2 h-5 w-5 text-primary" /> Skills
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
             {cvData.skills.map((skill, index) => (
               <Card key={index} className="mb-4 border border-border shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                     <CardTitle className="text-base font-medium">Skill #{index + 1}</CardTitle>
                     <Button variant="ghost" size="icon" onClick={() => onRemoveItem('skills', index)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove Skill</span>
                        </Button>
                 </CardHeader>
                  <CardContent className="space-y-3 pt-2">
                     <div>
                        <Label htmlFor={`skill-name-${index}`}>Skill Name</Label>
                        <Input id={`skill-name-${index}`} value={skill.name} onChange={(e) => handleListChange('skills', index, 'name', e.target.value)} placeholder="e.g., JavaScript, Project Management" />
                    </div>
                     {/* Optional: Add level selector here if needed */}
                     {/* <div>
                        <Label htmlFor={`skill-level-${index}`}>Proficiency Level (Optional)</Label>
                        <Input id={`skill-level-${index}`} value={skill.level || ''} onChange={(e) => handleListChange('skills', index, 'level', e.target.value)} placeholder="e.g., Expert, Intermediate" />
                    </div> */}
                  </CardContent>
                </Card>
             ))}
             <Button type="button" variant="outline" onClick={() => onAddItem('skills')} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
             </Button>
           </AccordionContent>
         </AccordionItem>

        {/* Certifications */}
        <AccordionItem value="certifications">
          <AccordionTrigger className="text-lg font-medium">
            <Award className="mr-2 h-5 w-5 text-primary" /> Certifications
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
             {cvData.certifications.map((cert, index) => (
                 <Card key={index} className="mb-4 border border-border shadow-sm">
                     <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                         <CardTitle className="text-base font-medium">Certification #{index + 1}</CardTitle>
                         <Button variant="ghost" size="icon" onClick={() => onRemoveItem('certifications', index)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
                             <Trash2 className="h-4 w-4" />
                             <span className="sr-only">Remove Certification</span>
                         </Button>
                     </CardHeader>
                     <CardContent className="space-y-3 pt-2">
                         <div>
                             <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                             <Input id={`cert-name-${index}`} value={cert.name} onChange={(e) => handleListChange('certifications', index, 'name', e.target.value)} placeholder="e.g., AWS Certified Solutions Architect" />
                         </div>
                         <div>
                             <Label htmlFor={`cert-org-${index}`}>Issuing Organization</Label>
                             <Input id={`cert-org-${index}`} value={cert.issuingOrganization} onChange={(e) => handleListChange('certifications', index, 'issuingOrganization', e.target.value)} placeholder="e.g., Amazon Web Services" />
                         </div>
                         <div>
                             <Label htmlFor={`cert-date-${index}`}>Date Issued (Optional)</Label>
                             <Input id={`cert-date-${index}`} type="month" value={cert.date || ''} onChange={(e) => handleListChange('certifications', index, 'date', e.target.value)} />
                         </div>
                     </CardContent>
                 </Card>
             ))}
             <Button type="button" variant="outline" onClick={() => onAddItem('certifications')} className="w-full">
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
             </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Languages */}
        <AccordionItem value="languages">
            <AccordionTrigger className="text-lg font-medium">
                <LanguagesIcon className="mr-2 h-5 w-5 text-primary" /> Languages
            </AccordionTrigger>
            <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
                {cvData.languages.map((lang, index) => (
                    <Card key={index} className="mb-4 border border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-base font-medium">Language #{index + 1}</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => onRemoveItem('languages', index)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove Language</span>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-2">
                            <div>
                                <Label htmlFor={`lang-name-${index}`}>Language</Label>
                                <Input id={`lang-name-${index}`} value={lang.name} onChange={(e) => handleListChange('languages', index, 'name', e.target.value)} placeholder="e.g., Spanish" />
                            </div>
                            <div>
                                <Label htmlFor={`lang-proficiency-${index}`}>Proficiency</Label>
                                <Input id={`lang-proficiency-${index}`} value={lang.proficiency} onChange={(e) => handleListChange('languages', index, 'proficiency', e.target.value)} placeholder="e.g., Native, Fluent, Conversational" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Button type="button" variant="outline" onClick={() => onAddItem('languages')} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Language
                </Button>
            </AccordionContent>
        </AccordionItem>


        {/* Projects */}
        <AccordionItem value="projects">
          <AccordionTrigger className="text-lg font-medium">
            <FolderGit2 className="mr-2 h-5 w-5 text-primary" /> Projects
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-4 bg-secondary rounded-md shadow-inner">
            {cvData.projects.map((proj, index) => (
               <Card key={index} className="mb-4 border border-border shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                     <CardTitle className="text-base font-medium">Project #{index + 1}</CardTitle>
                     <Button variant="ghost" size="icon" onClick={() => onRemoveItem('projects', index)} className="text-destructive hover:bg-destructive/10 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove Project</span>
                        </Button>
                 </CardHeader>
                 <CardContent className="space-y-3 pt-2">
                    <div>
                        <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                        <Input id={`project-name-${index}`} value={proj.name} onChange={(e) => handleListChange('projects', index, 'name', e.target.value)} placeholder="Project Title"/>
                    </div>
                    <div>
                        <Label htmlFor={`project-desc-${index}`}>Description</Label>
                        <Textarea id={`project-desc-${index}`} value={proj.description} onChange={(e) => handleListChange('projects', index, 'description', e.target.value)} placeholder="Describe the project..." rows={3}/>
                    </div>
                    <div>
                        <Label htmlFor={`project-url-${index}`}>Project URL (Optional)</Label>
                        <Input id={`project-url-${index}`} value={proj.url || ''} onChange={(e) => handleListChange('projects', index, 'url', e.target.value)} placeholder="Link to live demo or repository"/>
                    </div>
                 </CardContent>
               </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => onAddItem('projects')} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </form>
  );
}
