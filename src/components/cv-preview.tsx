'use client';

import type * as React from 'react';
import type { CVData } from '@/lib/types';
import { ProfessionalTemplate } from '@/components/templates/professional-template';
import { GradientTemplate } from '@/components/templates/gradient-template';
import { MinimalistTemplate } from '@/components/templates/minimalist-template';

interface CVPreviewProps {
  cvData: CVData;
  template: string;
}

export function CVPreview({ cvData, template }: CVPreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'professional':
        return <ProfessionalTemplate data={cvData} />;
      case 'gradient':
        return <GradientTemplate data={cvData} />;
      case 'minimalist':
        return <MinimalistTemplate data={cvData} />;
      default:
        return <ProfessionalTemplate data={cvData} />; // Default to professional
    }
  };

  return (
    // The div with id="cv-preview" is crucial for html2canvas targeting
    <div id="cv-preview" className="cv-preview-container bg-background text-foreground text-sm">
      {renderTemplate()}
    </div>
  );
}
