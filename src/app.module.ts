import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkordersModule } from './workorders/workorders.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ProvincesModule } from './provinces/provinces.module';
import { CitiesModule } from './cities/cities.module';
import { StoragesModule } from './storages/storages.module';
import { InventoriesModule } from './inventories/inventories.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    WorkordersModule,
    BrandsModule,
    ModelsModule,
    ClientsModule,
    AuthModule,
    UsersModule,
    CommonModule,
    ProvincesModule,
    CitiesModule,
    StoragesModule,
    InventoriesModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
