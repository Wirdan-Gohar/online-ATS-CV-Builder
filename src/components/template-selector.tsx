'use client';

import type * as React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image'; // Import next/image

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  { id: 'professional', name: 'Professional', description: 'Clean and ATS-friendly', imageUrl: 'https://picsum.photos/seed/prof/100/141' },
  { id: 'gradient', name: 'Gradient', description: 'Modern with subtle gradients', imageUrl: 'https://picsum.photos/seed/grad/100/141' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple and elegant', imageUrl: 'https://picsum.photos/seed/mini/100/141' },
];

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div>
      <Label className="text-base font-medium mb-3 block">Select a Template</Label>
      <RadioGroup
        defaultValue={selectedTemplate}
        onValueChange={onSelectTemplate}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {templates.map((template) => (
          <Label
            key={template.id}
            htmlFor={template.id}
            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
              selectedTemplate === template.id ? 'border-primary' : ''
            }`}
          >
            <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
             <div className="relative w-20 h-28 mb-2 border border-border rounded overflow-hidden">
                 <Image
                    src={template.imageUrl}
                    alt={`${template.name} template preview`}
                    layout="fill" // Use fill layout
                    objectFit="cover" // Cover the container
                    unoptimized // Since it's a placeholder from picsum
                />
             </div>
            <span className="text-sm font-medium mt-1">{template.name}</span>
            <span className="text-xs text-muted-foreground text-center">{template.description}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
