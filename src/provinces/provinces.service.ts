import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProvincesService {
  private readonly logger = new Logger('ProvinceService');

  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  async create(createProvinceDto: CreateProvinceDto) {
    try {
      const province = await this.provinceRepository.create(createProvinceDto);

      const { id, ...provinceData } = await this.provinceRepository.save(
        province,
      );

      return { id, ...provinceData };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    return await this.provinceRepository.find({
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const province = await this.provinceRepository.findOneBy({ id });

    if (!province)
      throw new NotFoundException(`Province with id ${id} not found`);

    return province;
  }

  async update(id: number, updateProvinceDto: UpdateProvinceDto) {
    const province = await this.provinceRepository.preload({
      id: id,
      ...updateProvinceDto,
    });

    if (!province)
      throw new NotFoundException(`Province with id ${id} not found`);

    try {
      return await this.provinceRepository.save(province);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const province = await this.findOne(id);

    await this.provinceRepository.remove(province);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
