import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChampionModule } from './champion/champion.module';
import { DataAnalyserModule } from './dataAnalyser/dataAnalyser.module';
import { DataProcessorModule } from './dataProcessor/dataPocessor.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRESS_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [],
  synchronize: true,
}),
ChampionModule,
DataAnalyserModule,
DataProcessorModule,
PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
