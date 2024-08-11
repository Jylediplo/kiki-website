import { FaClock } from 'react-icons/fa'; // Assurez-vous d'installer react-icons si ce n'est pas déjà fait

const StoreHours = () => {
  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-md flex flex-col">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-900 flex items-center justify-center">
        <FaClock className="mr-2" /> Horaires du magasin
      </h2>
      <ul className="list-none">
        <li className="py-2 border-b border-gray-300 text-lg text-gray-800">
          Lundi - Vendredi: <span className="font-semibold">9h00 - 18h00</span>
        </li>
        <li className="py-2 border-b border-gray-300 text-lg text-gray-800">
          Samedi: <span className="font-semibold">10h00 - 17h00</span>
        </li>
        <li className="py-2 text-lg text-gray-800">
          Dimanche: <span className="font-semibold">Fermé</span>
        </li>
      </ul>
    </div>
  );
};

export default StoreHours;
