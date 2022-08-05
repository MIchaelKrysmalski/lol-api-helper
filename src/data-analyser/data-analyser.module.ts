import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Participant } from "src/data-processor/entities/Participant.entity";
import { DataAnalyserController } from "./data-analyser.controller";
import { DataAnalyserService } from "./data-analyser.service";
import { ChampionData } from "./entities/championData.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Participant, ChampionData])
    ],
    controllers: [DataAnalyserController],
    providers: [DataAnalyserService],
})
export class DataAnalyserModule { }