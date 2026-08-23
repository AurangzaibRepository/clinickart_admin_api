import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

export type CreateBrandData = CreateBrandDto & {
  image?: string;
};

export type UpdateBrandData = UpdateBrandDto & {
  image?: string
};
