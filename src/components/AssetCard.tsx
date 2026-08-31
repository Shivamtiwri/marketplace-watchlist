import type { Asset } from '../types/asset';
import { useWatchlistStore } from '../store/watchlistStore';

interface AssetCardProps {
  asset: Asset;
}

const CATEGORY_BADGE: Record<Asset['category'], string> = {
  token: 'bg-blue-900 text-blue-300',
  nft: 'bg-purple-900 text-purple-300',
  defi: 'bg-emerald-900 text-emerald-300',
};

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

export function AssetCard({ asset }: AssetCardProps) {
  const isFavorite = useWatchlistStore((s) => s.isFavorite(asset.id));
  const toggleFavorite = useWatchlistStore((s) => s.toggleFavorite);

  const isPositive = asset.change24h >= 0;

  return (
    <div className="relative bg-gray-800 rounded-xl p-5 flex flex-col gap-3 border border-gray-700 hover:border-gray-600 transition-colors">
      {/* Favorite button */}
      <button
        onClick={() => toggleFavorite(asset.id)}
        aria-label={isFavorite ? `Remove ${asset.name} from watchlist` : `Add ${asset.name} to watchlist`}
        className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:text-rose-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
      >
        {isFavorite ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-rose-500">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
      </button>

      {/* Asset identity */}
      <div className="flex items-center gap-3 pr-8">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm text-gray-300">
          {asset.symbol.slice(0, 2)}
        </div>
        <div>
          <p className="font-semibold text-white leading-tight">{asset.name}</p>
          <p className="text-xs text-gray-400">{asset.symbol}</p>
        </div>
        <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_BADGE[asset.category]}`}>
          {asset.category}
        </span>
      </div>

      {/* Price & change */}
      <div className="flex items-end justify-between">
        <span className="text-lg font-bold text-white">
          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-700">
        <div>
          <p className="text-xs text-gray-500">Market Cap</p>
          <p className="text-sm text-gray-300">{formatCurrency(asset.marketCap)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Volume 24h</p>
          <p className="text-sm text-gray-300">{formatCurrency(asset.volume24h)}</p>
        </div>
      </div>
    </div>
  );
}
