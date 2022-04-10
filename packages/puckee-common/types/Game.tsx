import { IAthlete } from ".";


export interface IGame {
    id: number,
    gameTitle: string,
    remarks: string,
    organizers: IAthlete[],
    isPrivate: boolean,

    total_places: number,
    location: string,
    start: string,
    duration: string,
    players: IAthlete[],
    
    goalies: IAthlete[],
    referees: IAthlete[],
    exp_level: number,
    time_created: string,
    last_update: string 
  }

export type Game = { game: IGame } 

export type GameDay = {
  title: string,
  data: IGame[]
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