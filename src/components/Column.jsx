import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function Column({ id, title, tasks, onDeleteTask, onUpdateTask }) {
  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      type: 'Column',
    },
  });

  return (
    <div className="flex flex-col flex-1 min-w-[300px] bg-slate-100 rounded-xl p-4 border border-slate-200">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
        <span className="bg-slate-200 text-slate-600 text-base font-medium px-2.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div
        ref={setNodeRef}
        className="flex flex-col gap-3 flex-grow min-h-[150px]"
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
            />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg py-8">
            <span className="text-sm text-slate-400">Drop tasks here</span>
          </div>
        )}
      </div>
    </div>
  );
}
