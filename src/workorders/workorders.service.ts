import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkorderDto } from './dto/create-workorder.dto';
import { UpdateWorkorderDto } from './dto/update-workorder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workorder } from './entities/workorder.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkordersService {
  private readonly logger = new Logger('WorkordersService');

  constructor(
    @InjectRepository(Workorder)
    private readonly workorderRepository: Repository<Workorder>,
  ) {}

  async create(createWorkorderDto: CreateWorkorderDto) {
    try {
      const workorder = await this.workorderRepository.create(
        createWorkorderDto,
      );

      const { id, ...workorderData } = await this.workorderRepository.save(
        workorder,
      );

      return { id, ...workorderData };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.workorderRepository.find({});
  }

  async findOne(id: number) {
    const workorder = await this.workorderRepository.findOneBy({ id });

    if (!workorder)
      throw new NotFoundException(`Workorder with id ${id} not found`);

    return workorder;
  }

  async update(id: number, updateWorkorderDto: UpdateWorkorderDto) {
    try {
      const workorder = await this.workorderRepository.preload({
        id: id,
        ...updateWorkorderDto,
      });

      if (!workorder)
        throw new NotFoundException(`Workorder with id ${id} not found`);

      return await this.workorderRepository.save(workorder);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const workorder = await this.findOne(id);

    await this.workorderRepository.remove(workorder);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
