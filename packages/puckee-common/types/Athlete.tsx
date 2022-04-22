import { IGame, Serializable } from ".";

export enum AthleteRole {
  INVALID,
  User,
  Player,
  Goalie,
  Referee,
  Organizer
}

export type SelectedAthleteRole = {value: number, label: string}
export type AthleteRoleOption = SelectedAthleteRole | unknown

type AthleteRoleType = {
  id: number
  skill_level: number
}

type FollowStatus = {
  followed: boolean
  opt_out_mode: boolean
}

export interface IAthlete {
  id: number
  email: string
  name: string
  password: string | undefined
  roles: AthleteRoleType[]
  follow: FollowStatus | undefined
  followers: number[]
  last_login: string
  last_update: string
  accessToken: string | undefined
}

export interface IAthleteFollowAPI {
  opt_out_mode: boolean
}


export class Athlete implements Serializable<Athlete> {
    id: number
    email: string
    name: string
    password: undefined
    last_login: Date
    last_update: Date
    roles: AthleteRoleType[]
    follow: FollowStatus | undefined
    followers: number[]
    accessToken: string

  deserialize = (data: IAthlete): Athlete => {
      this.id = Number(data.id)
      this.email = data.email
      this.name = data.name
      this.last_login = new Date(data.last_login)
      this.last_update = new Date(data.last_update)
      this.roles = data.roles
      this.follow = data.follow
      this.followers = data.followers
      return this
  }

  serialize = (athlete: Athlete): any => {
    throw new Error('Method not implemented.')
  }

  roleNames = () => {
    return this.roles.map((role) => AthleteRole[role.id])
  }

  hasRole = (role: AthleteRole) : boolean => {
    var found = false
    this.roles.forEach( athleteRole => {
      if (athleteRole.id == role) {
        found = true
      }
    })
    return found
  }

  roleSkill = (role: AthleteRole) : number => {
    if (!this.hasRole(role))
      throw new Error(`Athlete ${this.id} does not have ${role} role, so no skill exists!`)
    
    var skill : number = 0
    this.roles.forEach((roleDict) => {
      if (roleDict.id == role)
        skill = roleDict.skill_level
    })
    return skill
  }

  uniqueRole = () : AthleteRole | undefined => {
    if (this.roles.length > 2) return undefined
  
    if (this.hasRole(AthleteRole.Player)) return AthleteRole.Player
    if (this.hasRole(AthleteRole.Goalie)) return AthleteRole.Goalie
    if (this.hasRole(AthleteRole.Referee)) return AthleteRole.Referee
    if (this.hasRole(AthleteRole.User)) return AthleteRole.User

    throw new Error("Unknown role of player " + this.id)
  }

  generatePlayerOption = () : SelectedAthlete=> {
    return {value: this.id, label: this.name}
  }
  
  //TODO: This is a temporary solution - 
  // API should determine the preferred role based on the count of games played
  preferredRole = () : AthleteRole => {
    if (this.hasRole(AthleteRole.Player)) {
      return AthleteRole.Player
    }
    if (this.hasRole(AthleteRole.Goalie)) {
      return AthleteRole.Goalie
    }
    if (this.hasRole(AthleteRole.Referee)) {
      return AthleteRole.Referee
    }
    return AthleteRole.Player
  }
}

export type SelectedAthlete = {value: number, label: string}
export type AthleteOption = SelectedAthlete | unknown