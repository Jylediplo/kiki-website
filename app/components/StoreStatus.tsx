import { FaClock } from 'react-icons/fa';

const StoreStatus = () => {
  const currentDay: number = new Date().getDay();

  const hours: { [key: number]: string } = {
    0: 'Fermé', // Dimanche
    1: 'Fermé', // Lundi
    2: '9h00 - 12h00, 14h00 - 19h00', // Mardi
    3: '9h00 - 12h00, 14h00 - 19h00', // Mercredi
    4: '9h00 - 12h00, 14h00 - 19h00', // Jeudi
    5: '9h00 - 12h00, 14h00 - 19h00', // Vendredi
    6: '9h00 - 12h00, 14h00 - 19h00', // Samedi
  };

  const isOpen = hours[currentDay] !== 'Fermé';
  const statusMessage = isOpen ? 'Ouvert' : 'Fermé';

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-md flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-900 flex items-center justify-center">
        <FaClock className="mr-2" />{' '}
        {`Le magasin est actuellement : ${statusMessage}`}
      </h2>
      <p className="text-lg text-gray-800 mb-4 text-center">
        Aujourd&apos;hui :{' '}
        <span className="font-semibold">{hours[currentDay]}</span>
      </p>
    </div>
  );
};

export default StoreStatus;
