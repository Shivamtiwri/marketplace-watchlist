import { useState } from 'react';
import { MOCK_ASSETS } from '../data/assets';
import { useWatchlistStore } from '../store/watchlistStore';
import { AssetCard } from '../components/AssetCard';

export function MarketplacePage() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const favorites = useWatchlistStore((s) => s.favorites);

  const visibleAssets = showFavoritesOnly
    ? MOCK_ASSETS.filter((a) => favorites.has(a.id))
    : MOCK_ASSETS;

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Assets</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {visibleAssets.length} {visibleAssets.length === 1 ? 'asset' : 'assets'}
            {showFavoritesOnly && ' in your watchlist'}
          </p>
        </div>

        {/* Watchlist filter toggle */}
        <button
          onClick={() => setShowFavoritesOnly((v) => !v)}
          aria-pressed={showFavoritesOnly}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
            showFavoritesOnly
              ? 'bg-rose-500 border-rose-500 text-white'
              : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={showFavoritesOnly ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          Watchlist
        </button>
      </div>

      {/* Asset grid */}
      {visibleAssets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-gray-600 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <p className="text-gray-400 font-medium">No assets in your watchlist</p>
          <p className="text-gray-600 text-sm mt-1">Click the heart icon on any asset to add it.</p>
          <button
            onClick={() => setShowFavoritesOnly(false)}
            className="mt-4 text-sm text-rose-400 hover:text-rose-300 underline underline-offset-2"
          >
            Browse all assets
          </button>
        </div>
      )}
    </main>
  );
}
