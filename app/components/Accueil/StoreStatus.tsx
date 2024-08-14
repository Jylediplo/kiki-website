const StoreStatus: React.FC = () => {
  const currentDay: number = new Date().getDay();

  const hours: { [key: number]: string } = {
    0: 'Fermé', // Dimanche
    1: 'Fermé', // Lundi
    2: '9h00 - 12h00 / 14h00 - 19h00', // Mardi
    3: '9h00 - 12h00 / 14h00 - 19h00', // Mercredi
    4: '9h00 - 12h00 / 14h00 - 19h00', // Jeudi
    5: '9h00 - 12h00 / 14h00 - 19h00', // Vendredi
    6: '9h00 - 12h00 / 14h00 - 19h00', // Samedi
  };

  const isOpen: boolean = hours[currentDay] !== 'Fermé';
  const statusMessage: string = isOpen ? 'Ouvert' : 'Fermé';

  return (
    <div className="p-6 bg-gray-900 shadow-lg rounded-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center text-white flex items-center justify-center">
        <span className={isOpen ? 'text-green-500' : 'text-red-500'}>
          {statusMessage}
        </span>
      </h2>
      <p className="text-md text-gray-400 mb-4 text-center">
        <p>Aujourd&apos;hui : </p>
        <span className="font-semibold">{hours[currentDay]}</span>
      </p>
      <p className="text-md text-gray-400 text-center">
        Tél :{' '}
        <a
          href="tel:0475572010"
          className="font-semibold text-blue-500 hover:underline"
        >
          04 75 57 20 10
        </a>
      </p>
    </div>
  );
};

export default StoreStatus;
