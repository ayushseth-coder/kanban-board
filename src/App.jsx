import { useState, useEffect } from 'react';
import Board from './components/Board';
import SearchBar from './components/SearchBar';
import TaskInput from './components/TaskInput';
import { LayoutDashboard } from 'lucide-react';

const INITIAL_TASKS = [
  { id: '1', text: 'Research target audience', priority: 'High', column: 'To Do' },
  { id: '2', text: 'Design database schema', priority: 'Medium', column: 'To Do' },
  { id: '3', text: 'Implement authentication', priority: 'High', column: 'In Progress' },
  { id: '4', text: 'Setup CI/CD pipeline', priority: 'Medium', column: 'Done' },
  { id: '5', text: 'Write project documentation', priority: 'Low', column: 'Done' },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
      }
    }
    return INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Persist state to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      priority,
      column: 'To Do',
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTaskText = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const moveTask = (id, newColumn) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, column: newColumn } : t))
    );
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Kanban<span className="text-indigo-600">Flow</span></h1>
          </div>
          <div className="flex items-center space-x-4">
             <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Create New Task</h2>
          <TaskInput onAddTask={addTask} />
        </section>

        <section className="flex-grow flex flex-col min-h-0">
          <Board
            tasks={filteredTasks}
            onMoveTask={moveTask}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTaskText}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
