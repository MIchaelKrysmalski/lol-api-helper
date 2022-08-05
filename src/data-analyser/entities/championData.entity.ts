import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ChampionData')
export class ChampionData extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    image: string;
    
    @Column()
    tags: string;
    
    @Column("decimal", { precision: 8, scale: 2 })
    winCount: number;
    
    @Column("decimal", { precision: 8, scale: 2 })
    looseCount: number;
    
    @Column()
    championId: number;
    
    @Column("decimal", { precision: 8, scale: 2 })
    damageDealtToBuildings: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    damageDealtToObjectives: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    damageSelfMitigated: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    topCount: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    midCount: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    jungleCount: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    adcCount: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    supportCount: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    visionScore: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    wardsPlaced: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    totalMinionsKilled: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    totalHeal: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    totalDamageTaken: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    totalDamageDealtToChampions: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    goldEarned: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    kills: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    deaths: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    assists: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    summonerLevel: number
    
    @Column("decimal", { precision: 8, scale: 2 })
    totalTimeSpendDead: number
    
    @Column()
    count: number;
}