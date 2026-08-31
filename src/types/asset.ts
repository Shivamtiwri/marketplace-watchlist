export interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  category: 'token' | 'nft' | 'defi';
}
