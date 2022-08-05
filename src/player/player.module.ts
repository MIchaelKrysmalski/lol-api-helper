import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';


@Module({
    imports: [
        TypeOrmModule.forFeature()
    ],
    controllers: [],
    providers: [PlayerService],
})
export class PlayerModule { }
