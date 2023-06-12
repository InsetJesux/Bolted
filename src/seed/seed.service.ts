import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/cities/entities/city.entity';
import { Province } from 'src/provinces/entities/province.entity';
import { Repository } from 'typeorm';
import { SeedData } from './data/seed.data';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  runSeeder() {
    this.runUserSeeder();
    this.runProvinceSeeder();
  }

  async runUserSeeder() {
    await this.userRepository.delete({});

    const promises = [];

    for (const user of SeedData.users) {
      promises.push(this.usersService.create(user));
    }

    await Promise.all(promises);
  }

  async runProvinceSeeder() {
    await this.provinceRepository.delete({});
    await this.provinceRepository.save(SeedData.provinces);
  }
}
