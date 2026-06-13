import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text.trim(), priority);
    setText('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        className="flex-grow px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400 text-slate-800 text-lg"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="px-4 py-2 border border-slate-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 font-medium text-lg"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <button
        type="submit"
        className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Task
      </button>
    </form>
  );
}
