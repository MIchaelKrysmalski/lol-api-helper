import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChampionModule } from './champion/champion.module';
import { DataAnalyserModule } from './data-analyser/data-analyser.module';
import { DataImporterModule } from './data-importer/data-importer.module';
import { DataProcessorModule } from './data-processor/data-processor.module';
import { PlayerModule } from './player/player.module';
import { DataAnalyserService } from './data-analyser/data-analyser.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Summoner } from './data-processor/entities/Summoner.entity';
import { Participant } from './data-processor/entities/Participant.entity';
import { MatchDetail } from './data-processor/entities/MatchDetail.entity';
import { ChampionData } from './data-analyser/entities/championData.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { DataExporterModule } from './data-exporter/data-exporter.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Summoner, Participant, MatchDetail, ChampionData],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res}) => ({ req, res}),
      driver: ApolloDriver
    }),
    ChampionModule,
    DataAnalyserModule,
    DataProcessorModule,
    DataExporterModule,
    PlayerModule,
    DataImporterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
