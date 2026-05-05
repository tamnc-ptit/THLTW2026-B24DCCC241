import { Droppable, Draggable } from "react-beautiful-dnd";
import { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  tasks: Task[];
  droppableId: string;
}

export default function KanbanColumn({
  title,
  tasks,
  droppableId,
}: Props) {
  return (
    <div style={{ width: 300 }}>
      <h3>{title}</h3>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: 400,
              background: "#f5f5f5",
              padding: 8,
              borderRadius: 8,
            }}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}