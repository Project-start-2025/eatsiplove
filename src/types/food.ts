export interface FoodFrontEnd {
    id: number;
    name: string;
    description: string;
    price: number;
    images: { url: string; public_id: string }[];
    user?: {
      id: number;
      username: string;
      fullName: string;
      role: string;
    } | null;
    stock?: number;
    averageRating?: number;
  }