import { CreateCategoryDto } from '../dto/create-category.dto';

export type CreateCategoryData = CreateCategoryDto & {
  image?: string;
};
