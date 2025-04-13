"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getStoredValue, setStoredValue } from "@/lib/utils";
import { QuoteDisplay } from "./_components/quote-display";
import { PlannerHeader } from "./_components/planner-header";
import { TaskList } from "./_components/task-list";
import { DropResult } from "@hello-pangea/dnd";

export default function DailyPlanner() {
  const [tasks, setTasks] = useState<Record<string, Record<number, string>>>(
    () => getStoredValue("dailyPlannerTasks", {})
  );
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<number[]>(() =>
    getStoredValue(
      "dailyPlannerTimeSlots",
      Array.from({ length: 9 }, (_, i) => i + 9)
    )
  );

  const dateKey = format(date, "yyyy-MM-dd");

  // Handle task input change
  const handleTaskChange = (hour: number, task: string) => {
    const newTasks = {
      ...tasks,
      [dateKey]: {
        ...tasks[dateKey],
        [hour]: task,
      },
    };
    setTasks(newTasks);
    setStoredValue("dailyPlannerTasks", newTasks);
  };

  // Clear a specific task
  const clearTask = (hour: number) => {
    const newTasks = { ...tasks };
    if (newTasks[dateKey]) {
      const dayTasks = { ...newTasks[dateKey] };
      delete dayTasks[hour];
      newTasks[dateKey] = dayTasks;
    }
    setTasks(newTasks);
    setStoredValue("dailyPlannerTasks", newTasks);
  };

  // Clear all tasks for the current day
  const clearAllTasks = () => {
    const newTasks = { ...tasks };
    delete newTasks[dateKey];
    setTasks(newTasks);
    setStoredValue("dailyPlannerTasks", newTasks);
  };

  // Handle drag end event
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(timeSlots);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTimeSlots(items);
    setStoredValue("dailyPlannerTimeSlots", items);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-200 bg-background">
      <Card className="max-w-3xl mx-auto">
        <PlannerHeader
          date={date}
          setDate={setDate}
          clearAllTasks={clearAllTasks}
        />

        <QuoteDisplay />

        <CardContent>
          <TaskList
            timeSlots={timeSlots}
            tasks={tasks[dateKey] || {}}
            dateKey={dateKey}
            onDragEnd={onDragEnd}
            handleTaskChange={handleTaskChange}
            clearTask={clearTask}
          />
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground">
          <p>Tip: Drag and drop time blocks to reorder them</p>
        </CardFooter>
      </Card>
    </div>
  );
}
