import { ExperienceCard } from "@/components/experience-card";

export interface Widget {
  name: string;
  component: React.ComponentType;
  description: string;
}

export const widgetRegistry: Record<string, Widget> = {
  "experience-card": {
    name: "Experience Card",
    component: ExperienceCard,
    description:
      "Add and manage work experience entries with a modern form interface.",
  },
  // Add more widgets here as they are created
};
