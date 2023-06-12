import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ModelsService {
  private readonly logger = new Logger('ModelsService');

  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    try {
      const model = await this.modelRepository.create(createModelDto);

      const { id, ...modelData } = await this.modelRepository.save(model);

      return { id, ...modelData };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.modelRepository.find({
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
      relations: {
        brand: true,
      },
    });
  }

  async findOne(id: number) {
    const model = await this.modelRepository.findOneBy({ id });

    if (!model) throw new NotFoundException(`Model with id ${id} not found`);

    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const model = await this.modelRepository.preload({
      id: id,
      ...updateModelDto,
    });

    if (!model) throw new NotFoundException(`Model with id ${id} not found`);

    try {
      return await this.modelRepository.save(model);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const model = await this.findOne(id);

    await this.modelRepository.remove(model);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
