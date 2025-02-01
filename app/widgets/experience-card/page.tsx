"use client";

import { ExperienceCard } from "@/components/experience-card";
import { motion } from "framer-motion";

export default function ExperienceCardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 flex flex-col items-center"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold">Experience Card</h1>
        <p className="text-muted-foreground mt-2">
          Add and manage your work experience with this interactive form
        </p>
      </div>

      <div className="flex justify-center">
        <ExperienceCard />
      </div>
    </motion.div>
  );
}
