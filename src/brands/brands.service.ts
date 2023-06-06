import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger('BrandsService');

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = await this.brandRepository.create(createBrandDto);

      const { id, ...brandData } = await this.brandRepository.save(brand);

      return { id, ...brandData };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.brandRepository.find({});
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOneBy({ id });

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.preload({
      id: id,
      ...updateBrandDto,
    });

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    try {
      return await this.brandRepository.save(brand);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const brand = await this.findOne(id);

    await this.brandRepository.remove(brand);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
