import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataImporterService } from "src/data-importer/data-importer.service";
import { DataProcessorService } from './data-processor.service';
import { MatchDetail } from "./entities/MatchDetail.entity";
import { Participant } from "./entities/Participant.entity";
import { Summoner } from "./entities/Summoner.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Summoner, MatchDetail, Participant]),
        ConfigModule,
    ],
    controllers: [],
    providers: [DataProcessorService, DataImporterService],
})
export class DataProcessorModule { }
