import { CreateProductDto } from '../dto/create-product.dto';

export type CreateProductData = CreateProductDto & {
  image?: string;
};
