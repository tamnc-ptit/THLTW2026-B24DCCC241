import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanColumn from "../components/KanbanColumn";
import { STATUS } from "../types/task";

interface Props {
  taskMap: any;
  updateTaskStatus: (id: string, status: any) => void;
}

export default function KanbanBoard({
  taskMap,
  updateTaskStatus,
}: Props) {

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    updateTaskStatus(taskId, newStatus as any);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 16 }}>
        <KanbanColumn
          title="Cần làm"
          tasks={taskMap.todo}
          droppableId={STATUS.TODO}
        />
        <KanbanColumn
          title="Đang làm"
          tasks={taskMap.inprogress}
          droppableId={STATUS.IN_PROGRESS}
        />
        <KanbanColumn
          title="Hoàn thành"
          tasks={taskMap.done}
          droppableId={STATUS.DONE}
        />
      </div>
    </DragDropContext>
  );
}