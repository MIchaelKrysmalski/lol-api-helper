import { Participant } from "./participant.interface"
import { Team } from "./team.interface"

export interface Info{
    
    //Unix timestamp for when the game is created
    gameCreation: number

    //game duration in sec
    gameDuration: number

    //timestamp for when the game ends
    gameEndTimestamp: number

    gameId: number

    //game constant
    gameMode: string

    gameName: string

    //Unix timestamp for when the match starts on the gameserver
    gameStartTimestamp: number

    gameType: string

    gameVersion: string

    mapId: number

    //participantsdto
    participants: Participant[]

    platformId: string

    queueId: number

    //Teamdto
    teams: Team[]

    tournamentCode: string
}