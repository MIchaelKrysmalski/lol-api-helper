import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param } from '@nestjs/common';
import { RawSummoner } from 'src/interfaces/summoner.interface';
import { brotliDecompress } from 'zlib';
import { DataImporterService } from './data-importer.service';
import { GameNameDto } from './dto/gamename.dto';
import { GetSummonersDto } from './dto/getSummoners.dto';
import { IdDto } from './dto/Id.dto';

@Controller('data-importer')
export class DataImporterController {
  constructor(private dataimportService: DataImporterService) {}

  @Get('/uuid/:id')
  async getByUUID(@Param() puuid: string): Promise<RawSummoner> {
    const result = await this.dataimportService.getByPUUID(puuid);
    return result;
  }

  @Get('/gamename')
  async getByGameName(@Body() gameNameDto: GameNameDto): Promise<any> {
    const response = await this.dataimportService.getByGameName(
      gameNameDto.gameName,
    );
    console.log(response);
    return response;
  }

  @Get('/champion-masteries')
  async getChampionMasteriesById(@Body() id: IdDto): Promise<any> {
    console.log(id);
    return this.dataimportService.getChampionMasteriesBySummonerId(id['id']);
  }

  @Get('/champion-score')
  async getChampionScoreById(@Body() id: IdDto): Promise<any> {
    return this.dataimportService.getChampionScoreBySummonerId(id['id']);
  }

  @Get('/champion-rotation')
  async getChampionRotation() {
    return this.dataimportService.getChampionRotation();
  }

  @Get('/summoners-by-rank')
  async getSummonersByRank(@Body() getSummonersDto: GetSummonersDto) {
    return this.dataimportService.getSummonerByDivision(
      getSummonersDto['queue'],
      getSummonersDto['tier'],
      getSummonersDto['division'],
      1,
    );
  }

  @Get('/summoner-match-history')
  async getSummponerMatchHistory(@Body() idDto: IdDto): Promise<any> {
    return this.dataimportService.getSummonerMatchHistory(idDto['id']);
  }

  @Get('/match-data')
  async getMatchData(@Body() matchId: IdDto): Promise<any> {
    return this.dataimportService.getGameData(matchId['id']);
  }
}
