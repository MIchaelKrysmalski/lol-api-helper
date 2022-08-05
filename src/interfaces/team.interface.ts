import { Ban } from "./ban.interface";
import { Objectives } from "./objectives.interface";

export interface Team{
    bans: Ban[]
    objectives: Objectives
    teamId: number
    win: boolean
}