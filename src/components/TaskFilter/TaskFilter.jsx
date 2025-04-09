const TaskFilter = ({ filter, setFilter }) => {
  const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'active', label: 'Activas' },
    { value: 'completed', label: 'Completadas' }
  ];

  return (
    <div className="mt-4 md:mt-0">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === value
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;