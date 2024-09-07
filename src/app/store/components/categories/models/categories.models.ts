export interface Category extends ICategory {
  uuid: string;
  sizeType: number;
}

export interface CategoryModel extends ICategory {
  sizeType_id: number;
}

interface ICategory {
  name: string;
  description: string;
}
