import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Participant } from "./Participant.entity";
import { Summoner } from "./Summoner.entity";

@Entity('MatchDetail')
export class MatchDetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Summoner, summoner => summoner.matchdetails)
    summoner: Summoner
    
    @Column()
    matchId: string;

    @Column()
    summonerId: string

    @Column()
    gameCreation: Date

    @Column()
    gameDuration: string

    @Column()
    gameType: string

    @OneToMany(() => Participant, participant => participant.matchdetail)
    participants: Participant[];
}