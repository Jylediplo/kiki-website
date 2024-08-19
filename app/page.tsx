import Address from './components/Accueil/Address';
import Map from './components/Accueil/Map';
import NewArrivals from './components/Accueil/NewArrivals';
import Carousel from './components/Accueil/Presentation';
import StoreHours from './components/Accueil/StoreHours';
import StoreStatus from './components/Accueil/StoreStatus';

export default function HomePage() {
  return (
    <header className="flex flex-col items-center justify-between p-8 ">
      <div className=" w-full max-w-6xl flex flex-col md:flex-row items-start md:items-stretch justify-between font-bold text-sm space-y-4 md:space-y-0 md:space-x-8">
        <div className="z-10 w-full md:w-1/3 flex flex-col space-y-4">
          <StoreStatus />
          <Address />
        </div>
        <div className="z-10 w-full md:w-2/3">
          <Map />
        </div>
      </div>
      <div className="z-10 w-full max-w-6xl mt-8">
        <StoreHours />
      </div>
      <div className="z-10 w-full max-w-6xl mt-8">
        <Carousel />
      </div>
      <div className="z-10 w-full max-w-6xl mt-8">
        <NewArrivals />
      </div>
    </header>
  );
}
