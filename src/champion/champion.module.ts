import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChampionService } from './champion.service';

@Module({
    imports: [
        TypeOrmModule.forFeature()
    ],
    controllers: [],
    providers: [ChampionService],
})
export class ChampionModule { }