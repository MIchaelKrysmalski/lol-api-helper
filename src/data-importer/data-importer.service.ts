import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { match } from 'assert';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { ChampionMastery } from 'src/interfaces/championmastery.interface';
import { Match } from 'src/interfaces/match.interface';
import { RankedPlayer } from 'src/interfaces/player.interface';
import { RankedSummoner, RawSummoner } from 'src/interfaces/summoner.interface';

@Injectable()
export class DataImporterService {
  constructor() {}
  
  private axios = require('axios').default;
  private riot_api_key = process.env.RIOT_API_KEY;

  async getByPUUID(puuid: string): Promise<RawSummoner> {
    let Summoner: RawSummoner = null;
    await this.axios
      .get(
        `https://europe.api.riotgames.com/riot/account/v4/accounts/by-puuid/${puuid}`,
        {
          headers: {
            'X-Riot-Token': this.riot_api_key,
          },
        },
      )
      .then(async function (response) {
        Summoner = (await response.data) as RawSummoner;
      })
      .catch(async function (error) {
        console.log(error);
      });
    console.log(Summoner);
    return Summoner;
  }

  async getByGameName(username: string): Promise<any> {
    let Summoner: RawSummoner = null;
    await this.axios
      .get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`,
        {
          headers: {
            'X-Riot-Token': this.riot_api_key,
          },
        },
      )
      .then(async function (response) {
        Summoner = (await response.data) as RawSummoner;
      })
      .catch(async function (error) {
        console.log(error);
      });
    return Summoner;
  }

  async getByGameSummonerId(summonerId: string): Promise<any> {
    let Summoner: RawSummoner = null;
    await this.axios
      .get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}`,
        {
          headers: {
            'X-Riot-Token': this.riot_api_key,
          },
        },
      )
      .then(async function (response) {
        Summoner = (await response.data) as RawSummoner;
      })
      .catch(async function (error) {
        console.log(error);
      });
    return Summoner;
  }

  async getChampionMasteriesBySummonerId(id: string) {
    let championMasteries: ChampionMastery[] = [];
    await this.axios
      .get(
        `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
        {
          headers: {
            'X-Riot-Token': this.riot_api_key,
          },
        },
      )
      .then(async function (response) {
        championMasteries = (await response.data) as ChampionMastery[];
      })
      .catch(async function (error) {
        console.log(error);
      });
    return championMasteries;
  }

  async getChampionScoreBySummonerId(id: string) {
    let score: number;
    await this.axios
      .get(
        `https://euw1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${id}`,
        {
          headers: {
            'X-Riot-Token': this.riot_api_key,
          },
        },
      )
      .then(async function (response) {
        score = (await response.data) as number;
      })
      .catch(async function (error) {
        console.log(error);
      });
    return score;
  }
  async getChampionRotation() {
    let freeChampionRotation: number[] = [];
    await this.axios
      .get(
        `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`,
        {
          headers: {
            'X-Riot-Token': this.riot_api_key,
          },
        },
      )
      .then(async function (response) {
        freeChampionRotation = await response.data.freeChampionIds;
      })
      .catch(async function (error) {
        console.log(error);
      });
    return freeChampionRotation;
  }
  async getRankedSummonerById(id: string):Promise<RankedSummoner[]>{
    let rankedSummoners: RankedSummoner[] = []
    await this.axios
    .get(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
      {
        headers: {
          'X-Riot-Token': this.riot_api_key,
        }
      },
    )
    .then(async function (response){
      rankedSummoners = await response.data
    })
    .catch(async function (error){
      console.log(error);
    });
    return rankedSummoners;
  }
  async getSummonerByDivision(
    queue: string,
    tier: string,
    division: string,
    page: number,
  ): Promise<RankedSummoner[]> {
      let gameData: RankedSummoner[];
      console.log(`${queue} ${tier} ${division} ${page}`)
    await this.axios
    .get(
      `https://euw1.api.riotgames.com/lol/league-exp/v4/entries/${queue}/${tier}/${division}?page=${page}`,
      {
        headers: {
          'X-Riot-Token': this.riot_api_key,
        },
      },
    )
    .then(async function (response) {
      gameData = await response.data as RankedSummoner[];
    })
    .catch(async function (error) {
      console.log(error);
    });
    return gameData
  }
  async getSummonerMatchHistory(uuid: string){
      let matchIds: string[] = []
    await this.axios
    .get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${uuid}/ids?start=0&count=10`,
      {
        headers: {
          'X-Riot-Token': this.riot_api_key,
        },
      },
    )
    .then(async function (response) {
      matchIds = await response.data as string[];
    })
    .catch(async function (error) {
      console.log(error);
    });
    return matchIds
  }

  async getGameData(matchId: string): Promise<Match>{
    let gameData: any;
    await this.axios
    .get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          'X-Riot-Token': this.riot_api_key,
        },
      },
    )
    .then(async function (response) {
      gameData = await response.data as Match;
    })
    .catch(async function (error) {
      console.log(error);
    });
    return gameData;
  }
}
