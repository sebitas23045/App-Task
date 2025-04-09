import { useState } from 'react';

const TaskItem = ({ task, toggleTaskCompletion, deleteTask, startEditing }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Formatear fecha
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md task-transition ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="mr-3 pt-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
          
          <div className="flex-grow" onClick={() => setIsExpanded(!isExpanded)}>
            <h3 className={`text-lg font-medium mb-1 cursor-pointer ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            
            {task.description && (isExpanded || !task.completed) && (
              <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            
            <div className="text-xs text-gray-500">
              Creada: {formatDate(task.createdAt)}
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => startEditing(task)}
              disabled={task.completed}
              className={`p-2 rounded-full hover:bg-gray-100 ${task.completed ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 rounded-full hover:bg-gray-100 text-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;