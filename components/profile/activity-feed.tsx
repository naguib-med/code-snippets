"use client";

import { formatDistanceToNow } from "date-fns";
import { Code2, Star, FolderPlus } from "lucide-react";
import type { Activity } from "@/lib/types";

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "snippet":
        return <Code2 className="h-4 w-4" />;
      case "favorite":
        return <Star className="h-4 w-4" />;
      case "collection":
        return <FolderPlus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 p-4 rounded-lg border bg-card"
        >
          <div className="p-2 rounded-full bg-primary/10">
            {getIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium">{activity.title}</p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(activity.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
