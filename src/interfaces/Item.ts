export interface Item {
  id: number;
  name: string;
  category: string;
  isVeg: boolean;
  description: string;
  fullDescription: string;
  image: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  servings: string;
}
