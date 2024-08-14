const StoreHours = () => {
  const hours = {
    Lundi: { morning: 'Fermé', afternoon: '' },
    Mardi: { morning: '9h00 - 12h00', afternoon: '14h00 - 19h00' },
    Mercredi: { morning: '9h00 - 12h00', afternoon: '14h00 - 19h00' },
    Jeudi: { morning: '9h00 - 12h00', afternoon: '14h00 - 19h00' },
    Vendredi: { morning: '9h00 - 12h00', afternoon: '14h00 - 19h00' },
    Samedi: { morning: '9h00 - 12h00', afternoon: '14h00 - 19h00' },
    Dimanche: { morning: 'Fermé', afternoon: '' },
  };

  const currentDayIndex = new Date().getDay();
  const daysOfWeek = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  const currentDay = daysOfWeek[currentDayIndex];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {Object.entries(hours).map(([day, times]) => (
          <div
            key={day}
            className={`flex flex-col items-center p-4 rounded-lg transition-transform transform hover:scale-105 ${
              day === currentDay ? 'bg-gray-700' : 'bg-gray-800'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-2">{day}</h3>
            <p className="text-white text-sm">{times.morning}</p>
            {times.afternoon && (
              <p className="text-white text-sm">{times.afternoon}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreHours;