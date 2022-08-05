import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChampionData } from "src/data-analyser/entities/championData.entity";
import { DataImporterService } from "src/data-importer/data-importer.service";
import { DataExporterResolver } from "./data-exporter.resolver";
import { DataExporterService } from "./data-exporter.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChampionData])
    ],
    providers: [DataExporterResolver, DataExporterService, DataImporterService]
})
export class DataExporterModule{}