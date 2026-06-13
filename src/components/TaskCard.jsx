import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, Edit2, Check } from 'lucide-react';

const priorityColors = {
  High: 'border-l-4 border-l-red-500',
  Medium: 'border-l-4 border-l-yellow-400',
  Low: 'border-l-4 border-l-green-500',
};

const priorityBadges = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: isEditing, // disable drag when editing
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, editText.trim());
    } else {
      setEditText(task.text); // revert if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white p-4 rounded-xl border-2 border-indigo-400 opacity-50 h-[100px]"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex flex-col bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${priorityColors[task.priority]}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-sm font-semibold px-2 py-1 rounded-md ${priorityBadges[task.priority]}`}>
          {task.priority}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking delete
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {isEditing ? (
        <div 
          className="flex items-center gap-2 mt-1"
          onPointerDown={(e) => e.stopPropagation()} // Prevent dragging while interacting with input
        >
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-grow text-sm text-slate-800 border-b-2 border-indigo-500 focus:outline-none bg-indigo-50 px-1 py-1 rounded"
          />
          <button onClick={handleSave} className="text-indigo-600 p-1 hover:bg-indigo-100 rounded">
            <Check className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div 
          className="flex items-start gap-2 mt-1 group/edit"
          onClick={() => setIsEditing(true)}
        >
          <p className="text-base text-slate-700 font-medium flex-grow break-words cursor-text">
            {task.text}
          </p>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover/edit:opacity-100 transition-opacity p-1 mt-[-2px]"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
