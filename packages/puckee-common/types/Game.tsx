import { Athlete, AthleteRole, IAthlete, Serializable } from ".";


export interface IGame {
    id: number,
    name: string,
    exp_players_cnt: number,
    exp_goalies_cnt: number,
    exp_referees_cnt: number,
    location_id: number,
    est_price: number,
    remarks: string,
    date: string,
    start_time: string,
    end_time: string,
    other_costs: number,
    is_private: boolean,

    goalie_renum: number,
    referee_renum: number,
    exp_skill: number,
    creation_time: string,
    last_updated: string
    total_places: number,
    location: string,
    start: string,
    
    players: IAthlete[],
    organizers: IAthlete[],
    goalies: IAthlete[],
    referees: IAthlete[],
  }

export class Game implements Serializable<Game> {
  id: number
  name: string
  exp_players_cnt: number
  exp_goalies_cnt: number
  exp_referees_cnt: number
  location_id: number
  est_price: number
  remarks: string
  date: Date
  start_time: Date
  end_time: Date
  other_costs: number
  is_private: boolean

  goalie_renum: number
  referee_renum: number
  exp_skill: number
  creation_time: Date
  last_updated: Date
  total_places: number
  location: string
  
  players: Athlete[]
  organizers: Athlete[]
  goalies: Athlete[]
  referees: Athlete[]

  deserialize = (data: IGame): Game => {
    this.id = Number(data.id)
    this.name = data.name
    this.exp_players_cnt = Number(data.exp_players_cnt)
    this.exp_goalies_cnt = Number(data.exp_goalies_cnt)
    this.exp_referees_cnt = Number(data.exp_referees_cnt)
    this.location_id = Number(data.location_id)
    this.est_price = Number(data.est_price)
    this.remarks = data.remarks
    this.date = new Date(data.date)
    this.start_time = new Date(`1970-01-01T${data.start_time}Z`)
    this.end_time = new Date(`1970-01-01T${data.end_time}Z`)
    this.other_costs = Number(data.other_costs)
    this.is_private = Boolean(data.is_private)

    this.goalie_renum = Number(data.goalie_renum)
    this.referee_renum = Number(data.referee_renum)
    this.exp_skill = Number(data.exp_skill)
    this.creation_time = new Date(data.creation_time)
    this.last_updated = new Date(data.last_updated)
    this.total_places = Number(data.total_places)
    this.location_id = Number(data.location_id)

    this.players = data.players.map(p => new Athlete().deserialize(p))
    this.organizers = data.organizers.map(o => new Athlete().deserialize(o))
    this.goalies = data.goalies.map(g => new Athlete().deserialize(g))
    this.referees = data.referees.map(r => new Athlete().deserialize(r))
    return this
}
  serialize(input: Game): Object {
    throw new Error ("Not implemented!")
  }

  isFullForRole = (role: AthleteRole) : boolean => {
    if (role == AthleteRole.Player) {
      return this.players.length >= this.exp_players_cnt ? true : false
    } else if (role == AthleteRole.Goalie) {
      return this.goalies.length >= this.exp_goalies_cnt ? true : false
    } else if (role == AthleteRole.Referee) {
      return this.referees.length >= this.exp_referees_cnt ? true : false
    } else {
      throw new Error(`Unknown role has been provided: ${role}`)
    }
  }

  participantRole = (athlete: Athlete) : AthleteRole | undefined=> {
    var gameRole : AthleteRole | undefined = undefined
    athlete.roles.forEach ( role => {
      switch (role.id) {
          case AthleteRole.Player: {
              this.players.some (player => player.id == athlete.id) ? gameRole = AthleteRole.Player : undefined
              break
          }
          case AthleteRole.Goalie: {
              this.goalies.some (goalie => goalie.id == athlete.id) ? gameRole = AthleteRole.Goalie : undefined
              break
          }
          case AthleteRole.Referee: {
              this.referees.some (referee => referee.id == athlete.id) ? gameRole = AthleteRole.Referee : undefined
              break
          }
      }
    })
    return gameRole
  }
}

export type GameType = { game: IGame } 

export type GameDay = {
  title: string,
  data: IGame[]
}

export interface IGameParticipantsAPI {
  athlete_id: number,
  athlete_role: number
}

export enum GameLocation {
  "Sportcentrum Lužánky - NHL plocha",
  "Sportcentrum Lužánky - Evropská plocha",
  "Hokejová hala ZŠ Úvoz",
  "Winning Group Arena",
  "Zimní stadion Kuřim",
  "Zimní stadion Rosice",
  "Zimní stadion Velká Bíteš",
  "Zimní stadion Blansko",
  "Zimní stadion Vyškov"
}



export type SelectedGameLoc = {value: number, label: string, price: number}
export type GameLocOption = SelectedGameLoc | unknown