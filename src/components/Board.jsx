import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from './Column';
import TaskCard from './TaskCard';

const COLUMNS = ['To Do', 'In Progress', 'Done'];

export default function Board({ tasks, onMoveTask, onDeleteTask, onUpdateTask }) {
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      const activeTask = tasks.find((t) => t.id === activeId);
      const overTask = tasks.find((t) => t.id === overId);
      
      if (activeTask && overTask && activeTask.column !== overTask.column) {
        onMoveTask(activeId, overTask.column);
      }
    }

    // Dropping a task over an empty column area
    if (isActiveTask && isOverColumn) {
      const activeTask = tasks.find((t) => t.id === activeId);
      if (activeTask && activeTask.column !== overId) {
        onMoveTask(activeId, overId);
      }
    }
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (isActiveTask && isOverColumn) {
      const activeTask = tasks.find((t) => t.id === activeId);
      if (activeTask && activeTask.column !== overId) {
        onMoveTask(activeId, overId);
      }
    }
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row gap-6 h-full items-start">
        {COLUMNS.map((colName) => {
          const colTasks = tasks.filter((t) => t.column === colName);
          return (
            <Column
              key={colName}
              id={colName}
              title={colName}
              tasks={colTasks}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          );
        })}
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? (
          <div className="opacity-80 rotate-2 scale-105 transition-transform">
            <TaskCard
              task={activeTask}
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
