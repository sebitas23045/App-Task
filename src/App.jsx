import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskStats from './components/TaskStats/TaskStats';

function App() {
  // Modelo de datos para cada tarea
  const initialTasks = [
    {
      id: uuidv4(),
      title: "Aprender React",
      description: "Estudiar los fundamentos de React",
      completed: false,
      createdAt: new Date()
    }
  ];

  // Estados principales
  const [tasks, setTasks] = useState(() => {
    // Intenta cargar tareas desde localStorage
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingTask, setEditingTask] = useState(null);

  // Guardar tareas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filtrar tareas según el estado seleccionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Funciones para manipular tareas
  const addTask = (task) => {
    const newTask = {
      id: uuidv4(),
      title: task.title,
      description: task.description,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-8">
          Gestión de Tareas
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <TaskForm 
              addTask={addTask} 
              editingTask={editingTask} 
              updateTask={updateTask} 
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <TaskStats tasks={tasks} />
              <TaskFilter 
                filter={filter} 
                setFilter={setFilter} 
              />
            </div>
            
            <TaskList 
              tasks={filteredTasks} 
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              startEditing={startEditing}
            />
          </div>
        </div>
        
        <footer className="text-center text-gray-600 mt-8">
          <p>© 2025 Gestión de Tareas - Desarrollado con React y Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;