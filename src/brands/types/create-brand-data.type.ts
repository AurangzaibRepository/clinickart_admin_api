import { CreateBrandDto } from '../dto/create-brand.dto';

export type CreateBrandData = CreateBrandDto & {
  image?: string;
};
