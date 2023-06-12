import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger('ClientsService');

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientRepository.create(createClientDto);

      const { id, ...clientData } = await this.clientRepository.save(client);

      return { id, ...clientData };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.clientRepository.find({
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
      relations: {
        city: {
          province: true,
        },
      },
    });
  }

  findOne(id: number): Promise<Client | null> {
    return this.clientRepository.findOneBy({ id });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({
      id: id,
      ...updateClientDto,
    });

    if (!client) throw new NotFoundException(`Client with id ${id} not found`);

    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const client = await this.findOne(id);

    await this.clientRepository.remove(client);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
