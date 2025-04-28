'use client';

import type * as React from 'react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CVForm } from '@/components/cv-form';
import { CVPreview } from '@/components/cv-preview';
import { TemplateSelector } from '@/components/template-selector';
import type { CVData } from '@/lib/types';
import { defaultCVData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';


export default function CVBuilder() {
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional'); // Default template
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

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


  const handleDownloadPDF = async () => {
    const previewElement = document.getElementById('cv-preview');
    if (!previewElement) {
        toast({
            title: "Error",
            description: "Could not find CV preview element.",
            variant: "destructive",
        });
        return;
    }

    setIsDownloading(true);

    try {
        // Slightly increase scale for better resolution
        const canvas = await html2canvas(previewElement, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt', // Use points for standard PDF sizing (like Word)
             format: 'a4' // Standard A4 size
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Calculate the ratio to fit the image to the PDF width
        const ratio = pdfWidth / imgWidth;
        const scaledHeight = imgHeight * ratio;

        // Check if the content fits on one page
        if (scaledHeight <= pdfHeight) {
             pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledHeight);
        } else {
            // Handle multi-page PDF generation if content overflows
            let position = 0;
            const pageHeightInPixels = pdfHeight / ratio; // Height of one PDF page in canvas pixels

             while (position < imgHeight) {
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = imgWidth;
                // Calculate the height of the current slice, ensuring it doesn't exceed remaining image height
                const sliceHeight = Math.min(pageHeightInPixels, imgHeight - position);
                pageCanvas.height = sliceHeight;

                const ctx = pageCanvas.getContext('2d');
                 if (ctx) {
                    // Draw the slice of the original canvas onto the page canvas
                    // sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight
                     ctx.drawImage(canvas, 0, position, imgWidth, sliceHeight, 0, 0, imgWidth, sliceHeight);

                     const pageImgData = pageCanvas.toDataURL('image/png');
                     pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, sliceHeight * ratio);

                     position += sliceHeight; // Move to the next part of the image

                     // Add a new page if there's more content
                     if (position < imgHeight) {
                         pdf.addPage();
                     }
                 } else {
                    throw new Error('Could not get canvas context for slicing.');
                 }
             }
        }


        pdf.save(`${cvData.personalInfo.fullName || 'cv'}_${selectedTemplate}.pdf`);
        toast({
            title: "Success",
            description: "Your CV has been downloaded.",
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        toast({
            title: "Error",
            description: "Failed to generate PDF. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsDownloading(false);
    }
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
                 <Button onClick={handleDownloadPDF} variant="outline" disabled={isDownloading}>
                    {isDownloading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Downloading...
                        </>
                    ) : (
                         <>
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </>
                    )}
                </Button>
            </div>
            <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
             <div className="mt-6 border border-border rounded-md p-4 bg-background overflow-auto max-h-[70vh]">
                <div id="cv-preview-wrapper"> {/* Added wrapper for potential sizing issues */}
                    <CVPreview cvData={cvData} template={selectedTemplate} />
                </div>
             </div>
           </div>
        </div>
      </div>

       {/* Downloading Progress Dialog */}
       <AlertDialog open={isDownloading}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Generating PDF</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your CV is being generated. Please wait a moment...
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center items-center p-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
