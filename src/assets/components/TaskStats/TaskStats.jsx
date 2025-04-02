const TaskStats = ({ tasks }) => {
  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  
  // Calcular porcentaje de progreso
  const progressPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-medium text-gray-800">Progreso</h3>
        <span className="text-sm text-gray-500 font-medium">
          {progressPercentage}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex space-x-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">{pendingCount}</span> pendientes
        </div>
        <div>
          <span className="font-medium">{completedCount}</span> completadas
        </div>
        <div>
          <span className="font-medium">{totalCount}</span> total
        </div>
      </div>
    </div>
  );
};

export default TaskStats;