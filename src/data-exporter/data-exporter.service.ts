import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DataImporterService } from 'src/data-importer/data-importer.service';
import { Repository } from 'typeorm';
import { ChampionData } from './models/champion-data.model';
import { ChampionMastery } from './models/champion-mastery.model';
import { Summoner } from './models/summoner.model';

export class DataExporterService {
    constructor(
        @InjectRepository(ChampionData)
        private championDataRepository: Repository<ChampionData>,
        private dataImporterService: DataImporterService,
    ) { }
    async getChampionData(sortedBy: string): Promise<ChampionData[]> {
        const championData = await this.championDataRepository.find();
        const championDataDto: ChampionData[] = [];
        championData.forEach((champion) => {
            const currentChamp: ChampionData = {
                name: champion['name'],
                title: champion['title'],
                description: champion['description'],
                tags: champion['tags'],
                winCount: champion['winCount'],
                looseCount: champion['looseCount'],
                championId: champion['championId'],
                damageDealtToBuildings: champion['damageDealtToBuildings'],
                damageDealtToObjectives: champion['damageDealtToObjectives'],
                damageSelfMitigated: champion['damageSelfMitigated'],
                topCount: champion['topCount'],
                midCount: champion['midCount'],
                jungleCount: champion['jungleCount'],
                adcCount: champion['adcCount'],
                supportCount: champion['supportCount'],
                visionScore: champion['visionScore'],
                wardsPlaced: champion['wardsPlaced'],
                totalMinionsKilled: champion['totalMinionsKilled'],
                totalHeal: champion['totalHeal'],
                totalDamageTaken: champion['totalDamageTaken'],
                totalDamageDealtToChampions: champion['totalDamageDealtToChampions'],
                goldEarned: champion['goldEarned'],
                kills: champion['kills'],
                deaths: champion['deaths'],
                assists: champion['assists'],
                summonerLevel: champion['summonerLevel'],
                totalTimeSpendDead: champion['totalTimeSpendDead'],
                count: champion['count'],
            };
            championDataDto.push(currentChamp);
        });
        if(sortedBy === "winratio"){
            championDataDto.sort((a,b) => {
                return a.winCount - b.winCount
            });
        }
        if(sortedBy === "looseratio"){
            championDataDto.sort((a,b) => {
                return a.looseCount - b.looseCount
            });
        }
        if(sortedBy === "alphabet"){
            championDataDto.sort((a,b) => {
                let fa = a.name.toLowerCase();
                let fb = b.name.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }
        return championDataDto;
    }

    async getChampionDataById(id: string): Promise<ChampionData> {
        const championData = await this.championDataRepository.findOne({
            where: {
                championId: id,
            },
        });
        return championData;
    }

    async getFreeRotation(): Promise<ChampionData[]> {
        const championIds = await this.dataImporterService.getChampionRotation()
        let championDataDto: ChampionData[] = [];
        for(let i = 0; i < championIds.length; i++){
            const champion = await this.championDataRepository.findOne({ where: { championId: championIds[i] } });
            if(champion){
            const currentChamp: ChampionData = {
                name: champion['name'],
                title: champion['title'],
                description: champion['description'],
                tags: champion['tags'],
                winCount: champion['winCount'],
                looseCount: champion['looseCount'],
                championId: champion['championId'],
                damageDealtToBuildings: champion['damageDealtToBuildings'],
                damageDealtToObjectives: champion['damageDealtToObjectives'],
                damageSelfMitigated: champion['damageSelfMitigated'],
                topCount: champion['topCount'],
                midCount: champion['midCount'],
                jungleCount: champion['jungleCount'],
                adcCount: champion['adcCount'],
                supportCount: champion['supportCount'],
                visionScore: champion['visionScore'],
                wardsPlaced: champion['wardsPlaced'],
                totalMinionsKilled: champion['totalMinionsKilled'],
                totalHeal: champion['totalHeal'],
                totalDamageTaken: champion['totalDamageTaken'],
                totalDamageDealtToChampions: champion['totalDamageDealtToChampions'],
                goldEarned: champion['goldEarned'],
                kills: champion['kills'],
                deaths: champion['deaths'],
                assists: champion['assists'],
                summonerLevel: champion['summonerLevel'],
                totalTimeSpendDead: champion['totalTimeSpendDead'],
                count: champion['count'],
            }
            championDataDto.push(currentChamp);
        }
        };
        return championDataDto;
    }

    async SummonerData(name: string) {
        let result: Summoner = {
            id: "",
            name: "",
            accountId: "",
            puuid: "",
            profileIconId: "",
            revisionDate: 0,
            summonerLevel: 0,
            championMastery: [],
            soloTier: "",
            soloRank: "",
            soloWins: 0,
            soloLosses: 0,
            soloLeaguePoints: 0,
            flexTier: "",
            flexRank: "",
            flexWins: 0,
            flexLosses: 0,
            flexLeaguePoints: 0
        };
        let summoner = await this.dataImporterService.getByGameName(name);
        result["id"] = summoner["id"];
        result["name"] = summoner["name"];
        result["accountId"] = summoner["accountId"];
        result["puuid"] = summoner["puuid"];
        result["profileIconId"] = summoner["profileIconId"];
        result["revisionDate"] = summoner["revisionDate"];
        result["summonerLevel"] = summoner["summonerLevel"];
        const championmastery: ChampionMastery[] = [];
        let championMasteries = await this.dataImporterService.getChampionMasteriesBySummonerId(result["id"]);
        championMasteries.forEach(async champion => {
            let championData = await this.championDataRepository.findOne({
                where: {
                    championId: champion["championId"]
                }
            });
            championmastery.push({
                id: champion["championId"],
                name: championData["name"],
                level: champion["championLevel"],
                summonerId: champion["summonerId"],
                points: champion["championPoints"],
                lastPlayTime: champion["lastPlayTime"],
                chestGranted: champion["chestGranted"],
            })
        })
        result["championMastery"] = championmastery;
        const rankedData = await this.dataImporterService.getRankedSummonerById(result["id"]);
        result["soloTier"] = rankedData[0]["tier"];
        result["soloRank"] = rankedData[0]["rank"];
        result["soloWins"] = rankedData[0]["wins"];
        result["soloLosses"] = rankedData[0]["losses"];
        result["soloLeaguePoints"] = rankedData[0]["leaguePoints"]
        result["flexTier"] = rankedData[1]["tier"];
        result["flexRank"] = rankedData[1]["rank"];
        result["flexWins"] = rankedData[1]["wins"];
        result["flexLosses"] = rankedData[1]["losses"];
        result["flexLeaguePoints"] = rankedData[1]["leaguePoints"]
        console.log(result);
        console.log(rankedData);
        return result;

    }



}
