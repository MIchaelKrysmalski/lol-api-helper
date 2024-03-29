export interface Championlist{
    name: string;
    title: string;
    description: string;
    image: string;
    tags: string;
    winCount: number;
    looseCount: number;
    championId: number;
    damageDealtToBuildings: number;
    damageDealtToObjectives: number;
    damageSelfMitigated: number;
    topCount: number;
    midCount: number;
    jungleCount: number;
    adcCount: number;
    supportCount: number;
    visionScore: number;
    wardsPlaced: number;
    totalMinionsKilled: number;
    totalHeal: number;
    totalDamageTaken: number;
    totalDamageDealtToChampions: number;
    goldEarned: number;
    kills: number;
    deaths: number;
    assists: number;
    summonerLevel: number;
    totalTimeSpendDead: number;
    count: number;
}