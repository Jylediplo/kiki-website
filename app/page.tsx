import Map from './components/Map';
import StoreHours from './components/StoreHours';

export default function HomePage() {
  return (
    <header className="flex flex-col items-center justify-between p-8">
      <div className="z-10 w-full max-w-7xl flex flex-col md:flex-row items-start justify-between font-bold text-sm space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/4">
          <StoreHours />
        </div>
        <div className="w-full md:w-3/4">
          <Map />
        </div>
      </div>
    </header>
  );
}
