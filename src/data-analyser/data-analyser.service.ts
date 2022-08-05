import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from 'src/data-processor/entities/Participant.entity';
import { Index, Repository } from 'typeorm';
import { ChampionData } from './entities/championData.entity';
import { Championlist } from './interfaces/ChampionList';

@Injectable()
export class DataAnalyserService {
  constructor() { }

  @InjectRepository(Participant)
  private participantRepository: Repository<Participant>;

  @InjectRepository(ChampionData)
  private championDataRepository: Repository<ChampionData>;

  //champion rotation
  //tierlist
  //player leaderboard
  //player data
  //champion counters

  //add validated tp participants to avoid more than analysis
  //analyse game and get data
  //champion entity
  // id, name,
  //champion winratio
  //winvs1, winvs2, winvs3, winvs4, loosevs1, loosevs2, loosevs3,
  //champion statistics
  //damagedealt count damagetaken kills deaths assists goldearned goldspent double tripple quadra top mid adc jungle utility totalheal totalMinionskilled

  async analyseChampionWinratio() {
    const fs = require('fs');

    const championList: Championlist[] = [];
    let championData: any;
    await fs.readFile(
      './src/constants/champion.json',
      'utf8',
      async (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        championData = JSON.parse(data);
        for(let i = 0; i < 40; i++) {
          console.log(i)
          const participants = await this.participantRepository.find(
            {
              take: 10000,
              where: {
                validated: false
              }

            },
          );
            participants.forEach(async (participant) => {
              if (
                championList.find(
                  champion => champion["championId"].toString() == participant["championId"].toString(),
                ) === undefined
              ) {
                //Champion will be validated the first time
                let champion: Championlist = {
                  name: "",
                  title: "",
                  description: "",
                  image: "",
                  tags: "",
                  winCount: 0,
                  looseCount: 0,
                  championId: 0,
                  damageDealtToBuildings: 0,
                  damageDealtToObjectives: 0,
                  damageSelfMitigated: 0,
                  topCount: 0,
                  midCount: 0,
                  jungleCount: 0,
                  adcCount: 0,
                  supportCount: 0,
                  visionScore: 0,
                  wardsPlaced: 0,
                  totalMinionsKilled: 0,
                  totalHeal: 0,
                  totalDamageTaken: 0,
                  totalDamageDealtToChampions: 0,
                  goldEarned: 0,
                  kills: 0,
                  deaths: 0,
                  assists: 0,
                  summonerLevel: 0,
                  totalTimeSpendDead: 0,
                  count: 0,
                };
                //name

                const championName = championData.data.filter(
                  (champion) => champion.key.toString() == participant.championId.toString(),
                );
                champion["name"] = championName[0]["name"];
                champion["championId"] = championName[0]["key"];                
                champion["title"] = championName[0]["title"];
                champion["description"] = championName[0]["blurb"];
                champion["image"] = championName[0]["image"]["full"];
                champion["tags"] = championName[0]["tags"].join("|");
                if (participant.win)
                  champion["winCount"]++;
                else
                  champion["looseCount"]++;

                switch (participant["teamPosition"]) {
                  case "TOP":
                    champion["topCount"]++;
                    break;
                  case "MIDDLE":
                    champion["midCount"]++;
                    break;
                  case "JUNGLE":
                    champion["jungleCount"]++;
                    break;
                  case "BOTTOM":
                    champion["adcCount"]++;
                    break;
                  case "UTILITY":
                    champion["supportCount"]++;
                    break;
                  default:
                }
                champion["damageDealtToBuildings"] += participant["damageDealtToBuildings"];
                champion["damageDealtToObjectives"] += participant["damageDealtToObjectives"];
                champion["damageSelfMitigated"] += participant["damageSelfMitigated"];
                champion["visionScore"] += participant["visionScore"];
                champion["wardsPlaced"] += participant["wardsPlaced"];
                champion["totalMinionsKilled"] += participant["totalMinionsKilled"];
                champion["totalHeal"] += participant["totalHeal"];
                champion["totalDamageTaken"] += participant["totalDamageTaken"];
                champion["totalDamageDealtToChampions"] += participant["totalDamageDealtToChampions"];
                champion["goldEarned"] += participant["goldEarned"];
                champion["kills"] += participant["kills"];
                champion["deaths"] += participant["deaths"];
                champion["assists"] += participant["assists"];
                champion["summonerLevel"] += participant["summonerLevel"];
                champion["totalTimeSpendDead"] += participant["totalTimeSpentDead"];
                champion["count"]++;
                championList.push(champion);
              } else {
                //Champion was already validated
                const index = championList.map(champion => champion.championId.toString()).indexOf(participant.championId.toString());
                if(index === -1)
                console.log(participant);
                if (index >= 0) {

                  switch (participant["teamPosition"]) {
                    case "TOP":
                      championList[index]["topCount"]++;
                      break;
                    case "MIDDLE":
                      championList[index]["midCount"]++;
                      break;
                    case "JUNGLE":
                      championList[index]["jungleCount"]++;
                      break;
                    case "BOTTOM":
                      championList[index]["adcCount"]++;
                      break;
                    case "UTILITY":
                      championList[index]["supportCount"]++;
                      break;
                    default:

                  }
                  if (participant.win)
                    championList[index]["winCount"]++;
                  else
                    championList[index]["looseCount"]++;

                  championList[index]["damageDealtToBuildings"] += participant["damageDealtToBuildings"];
                  championList[index]["damageDealtToObjectives"] += participant["damageDealtToObjectives"];
                  championList[index]["damageSelfMitigated"] += participant["damageSelfMitigated"];
                  championList[index]["visionScore"] += participant["visionScore"];
                  championList[index]["wardsPlaced"] += participant["wardsPlaced"];
                  championList[index]["totalMinionsKilled"] += participant["totalMinionsKilled"];
                  championList[index]["totalHeal"] += participant["totalHeal"];
                  championList[index]["totalDamageTaken"] += participant["totalDamageTaken"];
                  championList[index]["totalDamageDealtToChampions"] += participant["totalDamageDealtToChampions"];
                  championList[index]["goldEarned"] += participant["goldEarned"];
                  championList[index]["kills"] += participant["kills"];
                  championList[index]["deaths"] += participant["deaths"];
                  championList[index]["assists"] += participant["assists"];
                  championList[index]["summonerLevel"] += participant["summonerLevel"];
                  championList[index]["totalTimeSpendDead"] += participant["totalTimeSpentDead"];
                  championList[index]["count"]++;

                } else {
                  console.log('cannot find index', participant.championId);
                  return null;
                }
              }
              participant.validated = true;
              this.participantRepository.save(participant);
            });
        }
        championList.forEach(async championData => {
          const result = await this.championDataRepository.save({
            name: championData["name"],
            title: championData["title"],
            description: championData["description"],
            image: championData["description"],
            tags: championData["tags"],
            winCount: (championData["winCount"] / championData["count"]),
            looseCount: (championData["looseCount"] / championData["count"]),
            championId: championData["championId"],
            damageDealtToBuildings: (championData["damageDealtToBuildings"] / championData["count"]),
            damageDealtToObjectives: (championData["damageDealtToObjectives"] / championData["count"]),
            damageSelfMitigated: (championData["damageSelfMitigated"] / championData["count"]),
            topCount: championData["topCount"] / championData["count"],
            midCount: championData["midCount"] / championData["count"],
            jungleCount: championData["jungleCount"] / championData["count"],
            adcCount: championData["adcCount"] / championData["count"],
            supportCount: championData["supportCount"] / championData["count"],
            visionScore: championData["visionScore"] / championData["count"],
            wardsPlaced: championData["wardsPlaced"] / championData["count"],
            totalMinionsKilled: championData["totalMinionsKilled"] / championData["count"],
            totalHeal: championData["totalHeal"] / championData["count"],
            totalDamageTaken: championData["totalDamageTaken"] / championData["count"],
            totalDamageDealtToChampions: championData["totalDamageDealtToChampions"] / championData["count"],
            goldEarned: championData["goldEarned"] / championData["count"],
            kills: championData["kills"] / championData["count"],
            deaths: championData["deaths"] / championData["count"],
            assists: championData["assists"] / championData["count"],
            summonerLevel: championData["summonerLevel"] / championData["count"],
            totalTimeSpendDead: championData["totalTimeSpendDead"] / championData["count"],
            count: championData["count"],
          });
          console.log(result)
        })
      }
    );


  }
  async resetAnalyseProcess() {
    let finished: boolean = false;
    let counter: number = 0;
    while (!finished) {
      const participants = await this.participantRepository.find(
        {
          take: 5000,
          where: {
            validated: true
          }

        },
      );
      if (participants.length > 0) {
        participants.forEach(async participant => {
          participant.validated = false;
          await this.participantRepository.save(participant);
          if (counter % 5000 === 0) {
            console.log(participant.validated)
            console.log(counter);
          }
          counter++;
        })
      } else {
        finished = true;
      }
    }
  }
}


