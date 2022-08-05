import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DataAnalyserService } from './data-analyser.service';

@Controller('data-analyser')
export class DataAnalyserController {
    constructor(private dataAnalyserService:DataAnalyserService){ }

    @Post('/analyse')
    async analyseParticipantData() {
        await this.dataAnalyserService.analyseChampionWinratio();
    }
    @Post("/reset")
    async resetAnalyser(){
        await this.dataAnalyserService.resetAnalyseProcess();
    }

    
}
