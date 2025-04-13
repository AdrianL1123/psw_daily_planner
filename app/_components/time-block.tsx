"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TimeBlockProps {
  hour: number;
  task: string;
  dateKey: string;
  provided: any;
  handleTaskChange: (hour: number, task: string) => void;
  clearTask: (hour: number) => void;
}

export function TimeBlock({
  hour,
  task,
  dateKey,
  provided,
  handleTaskChange,
  clearTask,
}: TimeBlockProps) {
  const currentHour = new Date().getHours();

  // Get time block color based on current time
  const getTimeBlockColor = (hour: number) => {
    // Only apply color coding for today
    if (format(new Date(), "yyyy-MM-dd") !== dateKey) {
      return "bg-secondary/50";
    }

    if (hour < currentHour) return "bg-muted"; // Past
    if (hour === currentHour) return "bg-destructive/10 dark:bg-destructive/20"; // Current
    return "bg-primary/10 dark:bg-primary/20"; // Future
  };

  // Format hour to AM/PM
  const formatHour = (hour: number) => {
    return hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn(
        "grid grid-cols-[80px_1fr_auto] gap-2 items-center p-3 rounded-md transition-colors",
        getTimeBlockColor(hour)
      )}
    >
      <div className="font-medium text-sm md:text-base">{formatHour(hour)}</div>
      <Input
        value={task}
        onChange={(e) => handleTaskChange(hour, e.target.value)}
        placeholder="Add a task..."
        className="bg-background/80"
      />
      {task && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => clearTask(hour)}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear task</span>
        </Button>
      )}
    </div>
  );
}
