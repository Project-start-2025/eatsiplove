// Do FE của Giỏ hàng chỉ cần CartItem nên chỉ cần khai báo CartItem
interface Cart {
    id: number;
    foodName: string;
    foodPrice: number;
    quantity: number;
    totalPrice: number;
  }