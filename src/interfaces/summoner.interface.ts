export interface RawSummoner{
    
    id: string,
    puuid: string,
    name: string,
    profileIconId: number,
    summonerLevel: number
    revisionDate: number,
}

export interface RankedSummoner{
    leagueId: string,
        queueType: string,
        tier: string,
        rank: string,
        summonerId: string,
        summonerName: string,
        leaguePoints: number,
        wins: number,
        losses: number,
        veteran: boolean,
        inactive: boolean,
        freshBlood: boolean,
        hotStreak: boolean
}