import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'ChampionData'})
export class ChampionData{
    
    @Field()
    name: string;
    
    @Field()
    title: string;
    
    @Field()
    description: string;
    
    @Field()
    tags: string;
    
    @Field()
    winCount: number;
    
    @Field()
    looseCount: number;
    
    @Field(type => ID)
    championId: number;
    
    @Field()
    damageDealtToBuildings: number;
    
    @Field()
    damageDealtToObjectives: number;
    
    @Field()
    damageSelfMitigated: number;
    
    @Field()
    topCount: number;
    
    @Field()
    midCount: number;
    
    @Field()
    jungleCount: number;
    
    @Field()
    adcCount: number;
    
    @Field()
    supportCount: number;
    
    @Field()
    visionScore: number;
    
    @Field()
    wardsPlaced: number;
    
    @Field()
    totalMinionsKilled: number;
    
    @Field()
    totalHeal: number;
    
    @Field()
    totalDamageTaken: number;
    
    @Field()
    totalDamageDealtToChampions: number;
    
    @Field()
    goldEarned: number;
    
    @Field()
    kills: number;
    
    @Field()
    deaths: number;
    
    @Field()
    assists: number;
    
    @Field()
    summonerLevel: number;
    
    @Field()
    totalTimeSpendDead: number;
    
    @Field()
    count: number;
}