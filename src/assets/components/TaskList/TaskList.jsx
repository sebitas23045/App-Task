import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask, startEditing }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-5xl mb-4">📋</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">No hay tareas</h3>
        <p className="text-gray-500">¡Añade una nueva tarea para empezar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          startEditing={startEditing}
        />
      ))}
    </div>
  );
};

export default TaskList;