export interface Restaurant {
  id?: number; //Id tự tăng
  //idOwner: number; //Id của chủ cửa hàng
  name: string; //Tên cửa hàng
  address: string; //Địa chỉ cửa hàng
  phone: string; //Số điện thoại
  openTime: string; //Thời gian mở cửa
  closeTime: string; //Thời gian đóng cửa
  restaurantStatus: boolean; //Cửa hàng còn hoạt động hay không?
}
