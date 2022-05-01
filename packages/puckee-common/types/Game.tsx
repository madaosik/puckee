import { Athlete, AthleteRole, IAthlete, Serializable } from ".";
import { AnonymAthlete, IAnonymAthlete } from "./AnonymAthlete";


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
    last_updated?: string
    
    players: IAthlete[],
    anonym_players : IAnonymAthlete[],
    organizers: IAthlete[],
    goalies: IAthlete[],
    anonym_goalies : IAnonymAthlete[],
    referees: IAthlete[],
    anonym_referees : IAnonymAthlete[],
  }


export interface IGameAPI {
    id?: number,
    name: string,
    exp_players_cnt: number,
    exp_goalies_cnt: number,
    exp_referees_cnt: number,
    location_id: number,
    est_price: number,
    remarks: string,
    start_time: string,
    end_time: string,
    other_costs: number,
    is_private: boolean,

    goalie_renum: number,
    referee_renum: number,
    exp_skill: number,
    creation_time?: string,
    last_updated?: string
    players?: number[],
    anonym_players? : string[],
    organizers?: number[],
    goalies?: number[],
    anonym_goalies? : string[],
    referees?: number[],
    anonym_referees?: string[],
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
  
  players: Athlete[]
  anonym_players: AnonymAthlete[]
  organizers: Athlete[]
  goalies: Athlete[]
  anonym_goalies: AnonymAthlete[]
  referees: Athlete[]
  anonym_referees: AnonymAthlete[]

  constructor(creator?: Athlete) {
    this.name = ''
    this.exp_players_cnt = 20
    this.exp_goalies_cnt = 2
    this.exp_referees_cnt = 1
    this.est_price = 0
    this.remarks = ''

    var currDate = new Date()
    this.start_time = new Date()
    this.start_time.setDate(currDate.getDate() + 2)
    this.start_time.setHours(7)
    this.start_time.setMinutes(0)
    this.start_time.setSeconds(0)

    this.end_time = new Date()
    this.end_time.setDate(currDate.getDate() + 2)
    this.end_time.setHours(8)
    this.end_time.setMinutes(15)
    this.end_time.setSeconds(0)

    this.other_costs = 0
    this.is_private = false
    this.goalie_renum = 0
    this.referee_renum = 0
    this.exp_skill = 3
    this.players = []
    this.anonym_players = []
    if (creator) {
      this.organizers = [creator]
    } else {
      this.organizers = []
    }
    
    this.goalies = []
    this.anonym_goalies = []
    this.referees = []
    this.anonym_referees = []
  }

  deserialize = (data: IGame): Game => {
    this.id = Number(data.id)
    this.name = data.name
    this.exp_players_cnt = Number(data.exp_players_cnt)
    this.exp_goalies_cnt = Number(data.exp_goalies_cnt)
    this.exp_referees_cnt = Number(data.exp_referees_cnt)
    this.location_id = Number(data.location_id)
    this.est_price = Number(data.est_price)
    this.remarks = data.remarks
    // this.date = new Date(data.date)
    this.start_time = new Date(data.start_time)
    this.end_time = new Date(data.end_time)
    this.other_costs = Number(data.other_costs)
    this.is_private = Boolean(data.is_private)

    this.goalie_renum = Number(data.goalie_renum)
    this.referee_renum = Number(data.referee_renum)
    this.exp_skill = Number(data.exp_skill)
    this.creation_time = new Date(data.creation_time)
    this.last_updated = new Date(data.last_updated)
    this.location_id = Number(data.location_id)

    this.organizers = data.organizers.map(o => new Athlete().deserialize(o))

    this.players = data.players.map(p => new Athlete().deserialize(p))
    this.anonym_players = data.anonym_players.map(p => new AnonymAthlete().deserialize(p))
    
    this.goalies = data.goalies.map(g => new Athlete().deserialize(g))
    this.anonym_goalies = data.anonym_goalies.map(p => new AnonymAthlete().deserialize(p))

    this.referees = data.referees.map(r => new Athlete().deserialize(r))
    this.anonym_referees = data.anonym_referees.map(p => new AnonymAthlete().deserialize(p))
    return this
}
  serialize(input: Game): Object {
    throw new Error ("Not implemented!")
  }

  isFullForRole = (role: AthleteRole) : boolean => {
    if (role == AthleteRole.Player) {
      return (this.players.length + this.anonym_players.length) >= this.exp_players_cnt ? true : false
    } else if (role == AthleteRole.Goalie) {
      return (this.goalies.length + this.anonym_goalies.length) >= this.exp_goalies_cnt ? true : false
    } else if (role == AthleteRole.Referee) {
      return (this.referees.length + this.anonym_referees.length) >= this.exp_referees_cnt ? true : false
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

  startTimeString = () : string => {
    const hours = String(this.start_time.getUTCHours()).padStart(2, "0")
    const minutes = String(this.start_time.getUTCMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  endTimeString = () : string => {
    const hours = String(this.end_time.getUTCHours()).padStart(2, "0")
    const minutes = String(this.end_time.getUTCMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  dateString = (config?: Record<string, string>) : string => {
    var dateStringConfig : Record<string,string> = {weekday: 'short', day:'numeric', month: 'numeric'}
    for (let key in config) dateStringConfig[key] = config[key]
    return this.start_time.toLocaleString('cs-CZ', dateStringConfig)
  }

  findFollowed = (id: number, role: AthleteRole) => {
    switch (role) {
      case AthleteRole.Organizer:
        return this.organizers.filter(a => a.follow)
      case AthleteRole.Player:
        return this.players.filter(a => a.follow)
      case AthleteRole.Goalie:
        return this.goalies.filter(a => a.follow)
      case AthleteRole.Referee:
        return this.referees.filter(a => a.follow)
      default:
        throw new Error(`Unknown role has been provided: ${role}`)
    }
  }

  static dateInputString = (datetime: Date) : string => {
    const year = datetime.getFullYear()
    const month = String(datetime.getMonth() + 1).padStart(2, "0")
    const day = String(datetime.getDate() ).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  static timeInputString = (datetime: Date) : string => {
    const hours = String(datetime.getHours()).padStart(2, "0")
    const minutes = String(datetime.getMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }

  static datetimeAPIstring = (dateString: string, timeString: string) => {
    console.log(dateString)
    console.log(timeString)
    const [year, month, day] = dateString.split('-')
    const [hours, minutes] = timeString.split(':')
    return `${year}-${month}-${day}T${hours}:${minutes}:00`
  }
}

export type GameType = { game: IGame } 

export type GameDay = {
  title: string,
  data: IGame[]
}

export interface IGameParticipantsAPI {
  athlete_id?: number,
  athlete_role: number
}

export interface IGameAnonymParticipantsAPI {
  athlete_name?: string,
  athlete_role: number,
  requesting_id?: number
}


export type SelectedGameLoc = {value: number, label: string, address: string, price_per_hour: number}
export type GameLocOption = SelectedGameLoc | unknown