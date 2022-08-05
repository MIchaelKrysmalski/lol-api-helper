import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MatchDetail } from "./MatchDetail.entity";

@Entity('summoners')
export class Summoner extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => MatchDetail, matchdetail => matchdetail.summoner)
    matchdetails: MatchDetail[];

    @Column()
    leagueId: string;

    @Column()
    queueType: string;
    
    @Column()
    tier: string;

    @Column()
    rank: string;
    
    @Column()
    summonerId: string;

    @Column()
    summonerName: string;
    
    @Column()
    leaguePoints: number;

    @Column()
    wins: number;

    @Column()
    losses: number;

    @Column({nullable: true})
    puuid: string;
    
    @Column({nullable: true})
    profileIconId: number;
    
    @Column({nullable: true})
    summonerlevel: number;
    
    @Column({nullable: true})
    revisionDate: number;
    
    @Column()
    veteran: boolean;
    
    @Column()
    inactive: boolean;
    
    @Column()
    freshBlood: boolean;
    
    @Column()
    hotStreak: boolean;

    @Column()
    validated: boolean;
}
