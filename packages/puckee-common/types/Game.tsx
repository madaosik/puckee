import { IAthlete } from ".";

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

export type GameDay = {
  title: string,
  data: IGame[]
}