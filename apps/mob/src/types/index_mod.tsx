export interface IAthlete {
    id?: number,
    email: string,
    name: string,
    password?: string,
    perfLevel: number,
    roles: AthleteRole[]
    lastLogin?: Date,
    lastUpdate?: Date,
    accessToken?: string
}

export enum AthleteRole {
    INVALID,
    User,
    Player,
    Goalie,
    Referee
}

export interface IGame {
    id: number,
    name: string,
    total_places: number,
    location: string,
    start: string,
    duration: string,
    players: IAthlete[],
    organizers: IAthlete[],
    goalies: IAthlete[],
    referees: IAthlete[],
    exp_level: number,
    time_created: string,
    last_update: string 
  }

  export interface Serializable<T> {
      serialize(input: T): Object
      deserialize(input: Object): T
  }

