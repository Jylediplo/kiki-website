import Map from './components/Map';

export default function HomePage() {
  return (
    <header className="flex flex-col items-center justify-between p-8">
      <div className="z-10 w-full max-w-5xl flex items-center justify-between font-bold text-sm">
        <Map />
      </div>
    </header>
  );
}
