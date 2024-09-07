export interface Product {
  uuid: string;
  name: string;
  color: string;
  price: number;
  state: string;
  product_description: string;
  brandName: string;
  sizeName: string;
  categoryName: string;
  size_gender: string;
}

export interface ProductModel {
  uuid: string;
  name: string;
  color: string;
  price: number;
  state: string;
  description: string;
  brand_id: string;
  size_id: string;
  categoryId: string;
  sizeGender_id: string;
}
