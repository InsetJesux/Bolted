import { CreateCityDto } from 'src/cities/dto/create-city.dto';
import { CreateProvinceDto } from 'src/provinces/dto/create-province.dto';
import { ProvincesData } from './provinces.data';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersData } from './users.data';

interface SeedData {
  users: CreateUserDto[];
  provinces: CreateProvinceDto[];
  // cities: CreateCityDto[];
}

export const SeedData: SeedData = {
  users: UsersData,
  provinces: ProvincesData,
  // cities: [],
};
