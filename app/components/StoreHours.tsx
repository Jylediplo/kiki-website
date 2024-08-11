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

  return (
    <div className="p-6 bg-black shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">
        Horaires de la semaine
      </h2>
      <div className="flex flex-nowrap justify-between overflow-x-auto">
        {Object.entries(hours).map(([day, times]) => (
          <div
            key={day}
            className="flex flex-col items-center w-1/7 text-center mx-2"
          >
            <h3 className="text-lg font-semibold text-white">{day}</h3>
            <p className="text-white">{times.morning}</p>
            {times.afternoon && <p className="text-white">{times.afternoon}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreHours;
