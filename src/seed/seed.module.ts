import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CitiesModule } from 'src/cities/cities.module';
import { ProvincesModule } from 'src/provinces/provinces.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CitiesModule, ProvincesModule, UsersModule],
})
export class SeedModule {}
