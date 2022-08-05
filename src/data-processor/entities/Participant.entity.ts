import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MatchDetail } from "./MatchDetail.entity";

@Entity('Participant')
export class Participant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MatchDetail, matchdetail => matchdetail.participants, { onDelete: 'SET NULL' })
    matchdetail: MatchDetail;

    @Column({nullable: true})
    assists: number;

    @Column({nullable: true})
    baronKills: number;

    @Column({nullable: true})
    champLevel: number;

    @Column({nullable: true})
    championId: number;

    @Column({nullable: true})
    damageDealtToBuildings: number;

    @Column({nullable: true})
    damageDealtToObjectives: number;

    @Column({nullable: true})
    damageDealtToTurrets: number;

    @Column({nullable: true})
    damageSelfMitigated: number;

    @Column({nullable: true})
    deaths: number;

    @Column({nullable: true})
    detectorWardsPlaced: number
    
    @Column({nullable: true})
    doubleKills: number
    
    @Column({nullable: true})
    goldEarned: number
    
    @Column({nullable: true})
    goldSpent: number
    
    @Column({nullable: true})
    individualPosition: string;
    
    @Column({nullable: true})
    item0: number;
    
    @Column({nullable: true})
    item1: number;
    
    @Column({nullable: true})
    item2: number;
    
    @Column({nullable: true})
    item3: number;
    
    @Column({nullable: true})
    item4: number;
    
    @Column({nullable: true})
    item5: number;
    
    @Column({nullable: true})
    item6: number;
    
    @Column({nullable: true})
    kills: number;
    
    @Column({nullable: true})
    lane: string;
    
    @Column({nullable: true})
    longestTimeSpentLiving: number;
    
    @Column({nullable: true})
    magicDamageDealt: number
    
    @Column({nullable: true})
    magicDamageDealtToChampions: number
    
    @Column({nullable: true})
    magicDamageTaken: number
    
    @Column({nullable: true})
    neutralMinionsKilled: number
    
    @Column({nullable: true})
    objectivesStolen: number
    
    @Column({nullable: true})
    objectivesStolenAssists: number
    
    @Column({nullable: true})
    participantId: number
    
    @Column({nullable: true})
    pentaKills: number
    
    @Column({nullable: true})
    physicalDamageDealt: number
    
    @Column({nullable: true})
    physicalDamageDealtToChampions: number
    
    @Column({nullable: true})
    physicalDamageTaken: number
    
    @Column({nullable: true})
    profileIcon: number
    
    @Column({nullable: true})
    puuid: string
    
    @Column({nullable: true})
    quadraKills: number
    
    @Column({nullable: true})
    spell1Casts: number
    
    @Column({nullable: true})
    spell2Casts: number
    
    @Column({nullable: true})
    spell3Casts: number
    
    @Column({nullable: true})
    spell4Casts: number
    
    @Column({nullable: true})
    summoner1Casts: number
    
    @Column({nullable: true})
    summoner1Id: number
    
    @Column({nullable: true})
    summoner2Casts: number
    
    @Column({nullable: true})
    summoner2Id: number
    
    @Column({nullable: true})
    summonerId: string
    
    @Column({nullable: true})
    summonerLevel: number
    
    @Column({nullable: true})
    summonerName: string
    
    @Column({nullable: true})
    teamId: number
    
    @Column({nullable: true})
    teamPosition: string
    
    @Column({nullable: true})
    totalDamageDealt: number
    
    @Column({nullable: true})
    totalDamageDealtToChampions: number
    
    @Column({nullable: true})
    totalDamageShieldedOnTeammates: number
    
    @Column({nullable: true})
    totalDamageTaken: number
    
    @Column({nullable: true})
    totalHeal: number
    
    @Column({nullable: true})
    totalHealsOnTeammates: number
    
    @Column({nullable: true})
    totalMinionsKilled: number
    
    @Column({nullable: true})
    totalTimeCCDealt: number
    
    @Column({nullable: true})
    totalTimeSpentDead: number
    
    @Column({nullable: true})
    totalUnitsHealed: number
    
    @Column({nullable: true})
    tripleKills: number
    
    @Column({nullable: true})
    trueDamageDealt: number
    
    @Column({nullable: true})
    trueDamageDealtToChampions: number
    
    @Column({nullable: true})
    trueDamageTaken: number
    
    @Column({nullable: true})
    visionScore: number
    
    @Column({nullable: true})
    visionWardsBoughtInGame: number;
    
    @Column({nullable: true})
    wardsKilled: number
    
    @Column({nullable: true})
    wardsPlaced: number;
    
    @Column({nullable: true})
    win: boolean

    @Column({nullable: true})
    validated: boolean;
}