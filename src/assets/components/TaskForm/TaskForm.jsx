import { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editingTask, updateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  // Si hay una tarea en edición, actualiza el formulario
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    
    if (editingTask) {
      updateTask({
        ...editingTask,
        title,
        description
      });
    } else {
      addTask({ title, description });
    }
    
    // Limpiar formulario
    setTitle('');
    setDescription('');
    setError('');
  };

  const handleCancel = () => {
    updateTask(editingTask);
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingTask ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles adicionales de la tarea..."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3">
          {editingTask && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancelar
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            {editingTask ? 'Actualizar' : 'Añadir'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;