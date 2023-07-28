export interface address {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  _id: string;
}
export interface Order {
  _id: string;
  userId: string;
  address: address;
  email: string;
  products: {
    productId: {
      _id: string;
      heading: string;
      image1: string;
    };
    quantity: number;
    price: number;
    _id: string;
  }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  __v: number;
}
