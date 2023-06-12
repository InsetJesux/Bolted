import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Storage } from './entities/storage.entity';

@Injectable()
export class StoragesService {
  private readonly logger = new Logger('StorageService');

  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
  ) {}

  async create(createStorageDto: CreateStorageDto) {
    try {
      const storage = await this.storageRepository.create(createStorageDto);

      const { id, ...storageData } = await this.storageRepository.save(storage);

      return { id, ...storageData };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.storageRepository.find({
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const storage = await this.storageRepository.findOneBy({ id });

    if (!storage)
      throw new NotFoundException(`Storage with id ${id} not found`);

    return storage;
  }

  async update(id: number, updateStorageDto: UpdateStorageDto) {
    const storage = await this.storageRepository.preload({
      id: id,
      ...updateStorageDto,
    });

    if (!storage)
      throw new NotFoundException(`Storage with id ${id} not found`);

    try {
      return await this.storageRepository.save(storage);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const storage = await this.findOne(id);

    await this.storageRepository.remove(storage);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
