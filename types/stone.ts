export interface Stone {
  id: string
  category: 'diamond' | 'gemstone'
  attributes: Record<string, any>
}

export interface StoneItem {
  id: string;
  stoneType: string;
  quantity: number;
  shape: string;
  carat: number;
}