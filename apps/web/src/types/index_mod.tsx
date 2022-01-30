export enum AthleteRole {
    INVALID,
    User,
    Player,
    Goalie,
    Referee
}

// export roleMap = []

export interface IAthlete {
    id: number | undefined,
    email: string,
    name: string,
    password: string | undefined,
    perfLevel: number | undefined,
    roles: AthleteRole[] | [],
    lastLogin: Date | undefined,
    lastUpdate: Date | undefined,
    accessToken: string | undefined
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
