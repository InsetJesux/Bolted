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
import { StoragesService } from './storages.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('storages')
@UseGuards(JwtAuthGuard)
export class StoragesController {
  constructor(private readonly storagesService: StoragesService) {}

  @Post()
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storagesService.create(createStorageDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.storagesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageDto: UpdateStorageDto) {
    return this.storagesService.update(+id, updateStorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storagesService.remove(+id);
  }
}
