import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ChampionMastery } from "./champion-mastery.model";

@ObjectType({ description: 'Summoner'})
export class Summoner{
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    accountId: string;

    @Field()
    puuid: string;

    @Field()
    profileIconId: string;

    @Field()
    revisionDate: number;

    @Field()
    summonerLevel: number;

    @Field(type => [ChampionMastery])
    championMastery: ChampionMastery[];

    @Field()
    soloTier: string;

    @Field()
    soloRank: string;

    @Field()
    soloWins: number;

    @Field()
    soloLosses: number;

    @Field()
    soloLeaguePoints: number;

    @Field()
    flexTier: string;

    @Field()
    flexRank: string;
    
    @Field()
    flexWins: number;

    @Field()
    flexLosses: number;

    @Field()
    flexLeaguePoints: number;


}