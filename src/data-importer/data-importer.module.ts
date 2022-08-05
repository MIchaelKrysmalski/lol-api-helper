import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataImporterService } from './data-importer.service';
import { DataImporterController } from './data-importer.controller';
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature(),
        ConfigModule
    ],
    controllers: [DataImporterController],
    providers: [DataImporterService],
    exports: [DataImporterService],
})
export class DataImporterModule { }