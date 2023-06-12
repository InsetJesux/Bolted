import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CitiesService {
  private readonly logger = new Logger('CityService');

  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto) {
    try {
      const city = await this.cityRepository.create(createCityDto);

      const { id, ...cityData } = await this.cityRepository.save(city);

      return { id, ...cityData };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.cityRepository.find({
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
      relations: {
        province: true,
      },
    });
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOneBy({ id });

    if (!city) throw new NotFoundException(`City with id ${id} not found`);

    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.cityRepository.preload({
      id: id,
      ...updateCityDto,
    });

    if (!city) throw new NotFoundException(`City with id ${id} not found`);

    try {
      return await this.cityRepository.save(city);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const city = await this.findOne(id);

    await this.cityRepository.remove(city);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
