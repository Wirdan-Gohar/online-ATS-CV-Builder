'use client';

import type * as React from 'react';
import { useState } from 'react';
import { CVForm } from '@/components/cv-form';
import { CVPreview } from '@/components/cv-preview';
import { TemplateSelector } from '@/components/template-selector';
import type { CVData } from '@/lib/types';
import { defaultCVData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function CVBuilder() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional'); // Default template

  const handleInputChange = (
    section: keyof CVData,
    index: number | null,
    field: string,
    value: string | { name: string; level: string }[] | { name: string; url?: string }[] // Updated type for skills and projects
  ) => {
    setCvData((prevData) => {
      const newData = { ...prevData };
      if (index !== null && Array.isArray(newData[section])) {
        // @ts-ignore - Trusting the structure for array updates
        const sectionArray = [...newData[section]];
        // @ts-ignore - Field can be a keyof element type
        sectionArray[index] = { ...sectionArray[index], [field]: value };
        // @ts-ignore - Assigning back to the specific section key
        newData[section] = sectionArray;
      } else if (index === null && typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
         // @ts-ignore - Handling nested objects like personalInfo, contactInfo
        newData[section] = { ...newData[section], [field]: value };
      } else {
         // @ts-ignore - Direct update for top-level simple fields (e.g., professionalSummary)
        newData[section] = value;
      }
      return newData;
    });
  };

 const handleAddItem = (section: keyof CVData) => {
   setCvData((prevData) => {
     const newData = { ...prevData };
     if (Array.isArray(newData[section])) {
       const sectionArray = [...newData[section]];
       let newItem: any;
       switch (section) {
         case 'workExperience':
           newItem = { company: '', position: '', startDate: '', endDate: '', description: '' };
           break;
         case 'education':
           newItem = { institution: '', degree: '', startDate: '', endDate: '', description: '' };
           break;
         case 'skills':
           newItem = { name: '', level: '' };
           break;
         case 'certifications':
             newItem = { name: '', issuingOrganization: '', date: '' };
           break;
         case 'languages':
             newItem = { name: '', proficiency: '' };
           break;
         case 'projects':
           newItem = { name: '', description: '', url: '' };
           break;
         default:
           newItem = {}; // Default or throw error if section not handled
       }
       // @ts-ignore - Pushing new item to specific array section
       newData[section] = [...sectionArray, newItem];
     }
     return newData;
   });
 };

 const handleRemoveItem = (section: keyof CVData, index: number) => {
   setCvData((prevData) => {
     const newData = { ...prevData };
     if (Array.isArray(newData[section])) {
       const sectionArray = [...newData[section]];
       sectionArray.splice(index, 1);
        // @ts-ignore - Assigning updated array back
       newData[section] = sectionArray;
     }
     return newData;
   });
 };


  const handleDownloadPDF = () => {
    // In a real app, this would trigger server-side PDF generation or use a library like jsPDF client-side.
    // For now, it's a placeholder.
    alert('PDF download functionality is not yet implemented.');
    console.log('Downloading PDF with data:', cvData, 'and template:', selectedTemplate);
  };

  return (
    <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">CV Genie</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg shadow-md">
           <h2 className="text-2xl font-semibold mb-6 text-foreground">Enter Your Details</h2>
          <CVForm
            cvData={cvData}
            onInputChange={handleInputChange}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
           />
        </div>
        <div className="sticky top-8 self-start">
           <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-semibold text-foreground">Preview & Templates</h2>
                 <Button onClick={handleDownloadPDF} variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
            </div>
            <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
             <div className="mt-6 border border-border rounded-md p-4 bg-background overflow-auto max-h-[70vh]">
                <CVPreview cvData={cvData} template={selectedTemplate} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
