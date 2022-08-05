export interface Objective{
    first: boolean
    kills: number
}

export interface Objectives{
    baron: Objective
    champion: Objective
    dragon: Objective
    inhibitor: Objective
    riftHerald: Objective
    tower: Objective
}