"use client";

import { Clock, Trash2, CalendarIcon, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useTheme } from "next-themes";

interface PlannerHeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  clearAllTasks: () => void;
}

export function PlannerHeader({
  date,
  setDate,
  clearAllTasks,
}: PlannerHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <CardHeader className="flex flex-col gap-4 pb-2">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 w-full">
        <CardTitle className="text-2xl md:text-3xl flex items-center justify-center md:justify-start w-full md:w-auto">
          <Clock className="h-6 w-6 mx-2" />
          My Daily Planner
        </CardTitle>
        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-end w-full md:w-auto">
          {/* Mode button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {/* Mode button */}

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* Date picker */}

          {/* clear */}
          <Button variant="destructive" size="sm" onClick={clearAllTasks}>
            <Trash2 className="h-4 w-4" />
            Clear Day
          </Button>
          {/* clear */}
        </div>
      </div>
    </CardHeader>
  );
}
