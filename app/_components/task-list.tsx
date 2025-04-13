"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { TimeBlock } from "./time-block";

interface TaskListProps {
  timeSlots: number[];
  tasks: { [hour: string]: string };
  dateKey: string;
  onDragEnd: (result: DropResult) => void;
  handleTaskChange: (hour: number, task: string) => void;
  clearTask: (hour: number) => void;
}

export function TaskList({
  timeSlots,
  tasks,
  dateKey,
  onDragEnd,
  handleTaskChange,
  clearTask,
}: TaskListProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="timeSlots">
        {(provided) => (
          <div
            className="space-y-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {timeSlots.map((hour, index) => (
              <Draggable
                key={hour.toString()}
                draggableId={hour.toString()}
                index={index}
              >
                {(provided) => (
                  <TimeBlock
                    hour={hour}
                    task={tasks[hour] || ""}
                    dateKey={dateKey}
                    provided={provided}
                    handleTaskChange={handleTaskChange}
                    clearTask={clearTask}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
