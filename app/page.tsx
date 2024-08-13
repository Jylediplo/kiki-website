import Map from './components/Map';
import StoreHours from './components/StoreHours';
import StoreStatus from './components/StoreStatus';

export default function HomePage() {
  return (
    <header className="flex flex-col items-center justify-between p-8">
      <div className="z-10 w-full max-w-5xl flex flex-col md:flex-row items-start justify-between font-bold text-sm space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/3">
          <StoreStatus />
        </div>
        <div className="w-full md:w-2/3">
          <Map />
        </div>
      </div>
      <div className="w-full max-w-5xl mt-8">
        <StoreHours />
      </div>
    </header>
  );
}
