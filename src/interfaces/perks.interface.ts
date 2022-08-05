import { PerkStats } from "./perk-stats.interface"
import { PerkStyleDto } from "./perk-style.interface"

export interface Perks{
    statPerks: PerkStats
    styles: PerkStyleDto[]
}