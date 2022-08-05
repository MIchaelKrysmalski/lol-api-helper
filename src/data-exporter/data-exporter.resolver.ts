import { Args, Query, Resolver } from "@nestjs/graphql";
import { DataExporterService } from "./data-exporter.service";
import { ChampionData } from "./models/champion-data.model";
import { Summoner } from "./models/summoner.model";

@Resolver()
export class DataExporterResolver{
    constructor(
        private readonly dataExporterService: DataExporterService
    ){}

    @Query(returns => [ChampionData])
    async championData(@Args('sorted') sortedBy: string): Promise<ChampionData[]>{
        const championData = await this.dataExporterService.getChampionData(sortedBy);
        return championData;
    }

    @Query(returns => ChampionData)
    async getChamoionDataById(@Args('id') id: string): Promise<ChampionData>{
        const championdata = await this.dataExporterService.getChampionDataById(id);
        return championdata;
    }

    @Query(returns => [ChampionData])
    async freeRotation(): Promise<ChampionData[]>{
        const championData = await this.dataExporterService.getFreeRotation();
        console.log(championData);
        return championData;
    }

    @Query(returns => Summoner)
    async SummonerData(@Args('name') name: string): Promise<Summoner>{
        if(name === '')
        return {
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
        const summoner = await this.dataExporterService.SummonerData(name);
        return summoner;
    }
}