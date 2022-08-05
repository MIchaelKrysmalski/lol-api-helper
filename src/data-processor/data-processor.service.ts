import { ConsoleLogger, Injectable, SerializeOptions } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { timeStamp } from 'console';
import { fstat, readFile } from 'fs';
import { DataImporterService } from 'src/data-importer/data-importer.service';
import { JsonValue } from 'src/interfaces/json-value.interface';
import { RankedSummoner, RawSummoner } from 'src/interfaces/summoner.interface';
import { Repository } from 'typeorm';
import { runInThisContext } from 'vm';
import { MatchDetail } from './entities/MatchDetail.entity';
import { Participant } from './entities/Participant.entity';
import { Summoner } from './entities/Summoner.entity';

@Injectable()
export class DataProcessorService {
  constructor(private dataImporter: DataImporterService) {}

  private dataIndex: number = 36;
  private tierCount = 0;
  private divisionCount = 0;
  private playerCollection: RankedSummoner[] = [];
  private page: number = 1;

  @InjectRepository(Summoner)
  private summonerRepository: Repository<Summoner>;

  @InjectRepository(Participant)
  private participantRepository: Repository<Participant>;

  @InjectRepository(MatchDetail)
  private matchDetailReposiotry: Repository<MatchDetail>;

  @Cron('*/10 * * * * *')
  async processImportData() {
    let queues: JsonValue[];
    let tiers: JsonValue[];
    let divisions: JsonValue[];

    //In Case we dont need more Summoners, we can disable this process in the envFile
    if (process.env.IMPORTPLAYERDATA !== 'true') return;

    const fs = require('fs');
    await fs.readFile(
      './src/constants/queues.json',
      'utf8',
      async (error, data) => {
        if (error) {
          console.log(`Error: ${error}`);
          return;
        }
        queues = JSON.parse(data);

        await fs.readFile(
          './src/constants/tier.json',
          'utf8',
          async (error, data) => {
            if (error) {
              console.log(`Error: ${error}`);
              return;
            }
            tiers = JSON.parse(data);

            await fs.readFile(
              './src/constants/division.json',
              'utf8',
              async (error, data) => {
                if (error) {
                  console.log(`Error: ${error}`);
                  return;
                }
                divisions = JSON.parse(data);
                const players = await this.collectPlayerData(
                  queues,
                  tiers,
                  divisions,
                );
                players.forEach(async (player) => {
                  let summoner: Summoner = new Summoner();
                  for (var prop in player) {
                    summoner[prop] = player[prop];
                  }
                  summoner['validated'] = false;
                  let existing = await this.summonerRepository.findOne({
                    summonerId: summoner.summonerId,
                  });
                  if (existing == undefined) {
                    summoner.save();
                  }
                });
              },
            );
          },
        );
      },
    );

    //this.dataImporter.getSummonerByDivision("","","")
  }
  async collectPlayerData(
    queues: JsonValue[],
    tiers: JsonValue[],
    divisions: JsonValue[],
  ): Promise<RankedSummoner[]> {
    let queue = queues[0].name;
    if (this.divisionCount == divisions.length) {
      this.divisionCount = 0;
      this.tierCount++;
    }
    if (this.tierCount == tiers.length) {
      this.page++;
      this.tierCount = 0;
    }
    // Callenger and Grandmaster have on one division. Because of that we have to declae another rule
    if (this.tierCount < 3) {
      this.tierCount++;
      return await this.dataImporter.getSummonerByDivision(
        queues[0].name,
        tiers[this.tierCount - 1].name,
        divisions[0].name,
        1,
      );
    } else {
      this.divisionCount++;
      return await this.dataImporter.getSummonerByDivision(
        queues[0].name,
        tiers[this.tierCount].name,
        divisions[this.divisionCount - 1].name,
        this.page,
      );
    }
  }

  @Cron('*/30 * * * * *')
  async processPlayer() {
    if (process.env.PROCESSPLAYERS !== 'true') {
      return;
    }

    let summoner = await this.summonerRepository.findOne({
      where: {
        validated: false,
      },
    });
    if (summoner['validated'] === true) {
      console.log(summoner.id + ' ' + ' ist bereits validated :/');
      return;
    }
    console.log(summoner.summonerName);
    //get uuid froom summoner
    const rawSummoner: RawSummoner =
      await this.dataImporter.getByGameSummonerId(summoner.summonerId);
    console.log(rawSummoner);
    summoner['puuid'] = rawSummoner['puuid'];
    summoner['profileIconId'] = rawSummoner['profileIconId'];
    summoner['summonerlevel'] = rawSummoner['summonerLevel'];
    summoner['revisionData'] = rawSummoner['revisionDate'];
    summoner['validated'] = true;
    await summoner.save();
    //get matchhistory with uuid from summoner

    let summonerMatchHistory = await this.dataImporter.getSummonerMatchHistory(
      rawSummoner['puuid'],
    );
    //get matchdetails foreach summoner
    const matchDetails: MatchDetail[] = [];
    summonerMatchHistory.forEach(async (matchId) => {
      let matchDetail = await this.dataImporter.getGameData(matchId);

      const match = this.matchDetailReposiotry.create({
        matchId: matchDetail.metadata.matchId,
        summonerId: summoner.summonerId,
        gameCreation: new Date(matchDetail.info.gameCreation),
        gameDuration: matchDetail.info.gameDuration.toString(),
        gameType: matchDetail.info.gameType,
        summoner: summoner,
      });
      await match.save();

      await this.matchDetailReposiotry.save(match);
      const participants: Participant[] = [];
      matchDetail.info.participants.forEach(async (participant) => {
        let newParticipant: Participant = new Participant();
        newParticipant.assists = participant.assists;
        newParticipant.baronKills = participant.baronKills;
        newParticipant.champLevel = participant.champLevel;
        newParticipant.championId = participant.championId;
        newParticipant.damageDealtToBuildings =
          participant.damageDealtToBuildings;
        newParticipant.damageDealtToObjectives =
          participant.damageDealtToObjectives;
        newParticipant.damageDealtToTurrets = participant.damageDealtToTurrets;
        newParticipant.damageSelfMitigated = participant.damageSelfMitigated;
        newParticipant.deaths = participant.deaths;
        newParticipant.detectorWardsPlaced = participant.detectorWardsPlaced;
        newParticipant.doubleKills = participant.doubleKills;
        newParticipant.goldEarned = participant.goldEarned;
        newParticipant.goldSpent = participant.goldSpent;
        newParticipant.individualPosition = participant.individualPosition;
        newParticipant.item0 = participant.item0;
        newParticipant.item1 = participant.item1;
        newParticipant.item2 = participant.item2;
        newParticipant.item3 = participant.item3;
        newParticipant.item4 = participant.item4;
        newParticipant.item5 = participant.item5;
        newParticipant.item6 = participant.item6;
        newParticipant.kills = participant.kills;
        newParticipant.lane = participant.lane;
        newParticipant.longestTimeSpentLiving =
          participant.longestTimeSpentLiving;
        newParticipant.magicDamageDealt = participant.magicDamageDealt;
        newParticipant.magicDamageDealtToChampions =
          participant.magicDamageDealtToChampions;
        newParticipant.magicDamageTaken = participant.magicDamageTaken;
        newParticipant.neutralMinionsKilled = participant.neutralMinionsKilled;
        newParticipant.objectivesStolen = participant.objectivesStolen;
        newParticipant.objectivesStolenAssists =
          participant.objectivesStolenAssists;
        newParticipant.participantId = participant.participantId;
        newParticipant.pentaKills = participant.pentakills;
        newParticipant.physicalDamageDealt = participant.physicalDamageDealt;
        newParticipant.profileIcon = participant.profileIcon;
        newParticipant.puuid = participant.puuid;
        newParticipant.quadraKills = participant.quadraKills;
        newParticipant.spell1Casts = participant.spell1Casts;
        newParticipant.spell1Casts = participant.spell1Casts;
        newParticipant.spell2Casts = participant.spell2Casts;
        newParticipant.spell3Casts = participant.spell3Casts;
        newParticipant.spell4Casts = participant.spell4Casts;
        newParticipant.summoner1Casts = participant.summoner1Casts;
        newParticipant.summoner2Casts = participant.summoner2Casts;
        newParticipant.summoner1Id = participant.summoner1Id;
        newParticipant.summoner2Id = participant.summoner2Id;
        newParticipant.summonerId = participant.summonerId;
        newParticipant.summonerLevel = participant.summonerLevel;
        newParticipant.summonerName = participant.summonerName;
        newParticipant.teamId = participant.teamId;
        newParticipant.teamPosition = participant.teamPosition;
        newParticipant.totalDamageDealt = participant.totalDamageDealt;
        newParticipant.totalDamageDealtToChampions =
          participant.totalDamageDealtToChampions;
        newParticipant.totalDamageShieldedOnTeammates =
          participant.totalDamageShieldedOnTeammates;
        newParticipant.totalDamageTaken = participant.totalDamageTaken;
        newParticipant.totalHeal = participant.totalHeal;
        newParticipant.totalHealsOnTeammates =
          participant.totalHealsOnTeammates;
        newParticipant.totalMinionsKilled = participant.totalMinionsKilled;
        newParticipant.totalTimeCCDealt = participant.totalTimeCCDealt;
        newParticipant.totalTimeSpentDead = participant.totalTimeSpentDead;
        newParticipant.totalUnitsHealed = participant.totalUnitsHealed;
        newParticipant.tripleKills = participant.tripleKills;
        newParticipant.trueDamageDealt = participant.trueDamageDealt;
        newParticipant.trueDamageDealtToChampions =
          participant.trueDamageDealtToChampions;
        newParticipant.trueDamageTaken = participant.trueDamageTaken;
        newParticipant.visionScore = participant.visionScore;
        newParticipant.visionWardsBoughtInGame =
          participant.visionWardsBoughtInGame;
        newParticipant.wardsKilled = participant.wardsKilled;
        newParticipant.wardsPlaced = participant.wardsPlaced;
        newParticipant.win = participant.win;
        newParticipant.matchdetail = match;
        //const result = this.participantRepository.create(newParticipant);
        this.participantRepository.save(newParticipant);
        //console.log(newParticipant)
      });

      console.log(match);
    });
  }
}
