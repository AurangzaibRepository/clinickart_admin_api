import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export type CreateProductData = CreateProductDto & {
  image?: string;
};

export type UpdateProductData = UpdateProductDto & {
  image?: string;
}
