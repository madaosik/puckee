import { IAthlete, Serializable } from ".";


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