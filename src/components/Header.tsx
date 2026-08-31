import { useWatchlistStore } from '../store/watchlistStore';

export function Header() {
  const favoritesCount = useWatchlistStore((s) => s.favorites.size);

  return (
    <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Marketplace
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Watchlist</span>
          {favoritesCount > 0 ? (
            <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full bg-rose-500 text-white text-xs font-semibold">
              {favoritesCount}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full bg-gray-700 text-gray-400 text-xs font-semibold">
              0
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
