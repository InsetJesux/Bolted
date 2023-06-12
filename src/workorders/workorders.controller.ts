import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkordersService } from './workorders.service';
import { CreateWorkorderDto } from './dto/create-workorder.dto';
import { UpdateWorkorderDto } from './dto/update-workorder.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('workorders')
@UseGuards(JwtAuthGuard)
export class WorkordersController {
  constructor(private readonly workordersService: WorkordersService) {}

  @Post()
  create(@Body() createWorkorderDto: CreateWorkorderDto) {
    return this.workordersService.create(createWorkorderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.workordersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workordersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkorderDto: UpdateWorkorderDto,
  ) {
    return this.workordersService.update(+id, updateWorkorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workordersService.remove(+id);
  }
}
