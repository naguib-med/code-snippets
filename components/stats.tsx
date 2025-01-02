"use client";

import { motion } from "framer-motion";
import { FileCode, Globe, Tag, Calendar } from "lucide-react";

interface StatsProps {
  stats: {
    totalSnippets: number;
    totalLanguages: number;
    totalTags: number;
    snippetsThisWeek: number;
  };
}

export function Stats({ stats }: StatsProps) {
  const items = [
    { icon: FileCode, label: "Total Snippets", value: stats.totalSnippets },
    { icon: Globe, label: "Languages", value: stats.totalLanguages },
    { icon: Tag, label: "Tags", value: stats.totalTags },
    { icon: Calendar, label: "New This Week", value: stats.snippetsThisWeek },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center p-4 rounded-lg bg-card"
        >
          <item.icon className="h-8 w-8 text-primary mb-2" />
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
