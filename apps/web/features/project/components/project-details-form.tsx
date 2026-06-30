'use client';

import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

type ProjectDetailsFormProps = {
  name: string;
  description: string;

  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

export function ProjectDetailsForm({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}: ProjectDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="project-name">
          Project Name
        </Label>

        <Input
          id="project-name"
          value={name}
          placeholder="ShipFlow"
          onChange={(e) =>
            onNameChange(e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-description">
          Description
        </Label>

        <Textarea
          id="project-description"
          value={description}
          rows={4}
          placeholder="AI powered engineering workflow..."
          onChange={(e) =>
            onDescriptionChange(e.target.value)
          }
        />
      </div>
    </div>
  );
}