import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkordersService } from './workorders.service';
import { CreateWorkorderDto } from './dto/create-workorder.dto';
import { UpdateWorkorderDto } from './dto/update-workorder.dto';

@Controller('workorders')
export class WorkordersController {
  constructor(private readonly workordersService: WorkordersService) {}

  @Post()
  create(@Body() createWorkorderDto: CreateWorkorderDto) {
    return this.workordersService.create(createWorkorderDto);
  }

  @Get()
  findAll() {
    return this.workordersService.findAll();
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
