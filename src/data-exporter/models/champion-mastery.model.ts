import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'Champion-Mastery'})
export class ChampionMastery{
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    level: number;

    @Field()
    summonerId: string;

    @Field()
    points: number;

    @Field()
    lastPlayTime: number;

    @Field()
    chestGranted: boolean;
}