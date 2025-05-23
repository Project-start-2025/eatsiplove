export interface Food {
  id?: number; // auto-increment
  idCategory: number; //
  idRestaurant: number;
  //idImage: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}
