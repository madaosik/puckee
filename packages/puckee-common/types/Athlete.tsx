import { Serializable } from ".";

// export const emptyAthlete = () : IAthlete => ({
//   id: undefined,
//   email: '',
//   name: '',
//   lastLogin: ''

// })

export enum AthleteRole {
  INVALID,
  User,
  Player,
  Goalie,
  Referee
}

export type AthleteRoleOption = {value: number, label: string} | unknown

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

export class Athlete implements Serializable<Athlete>, IAthlete {
    id: number
    email: string
    name: string
    password: undefined
    lastLogin: Date
    lastUpdate: Date
    roles: AthleteRole[] = []
    perfLevel: number
    accessToken: string


  static emptyAthlete = () : IAthlete => {
    return {
      id: undefined,
      email: '',
      name: '',
      password: '',
      perfLevel: undefined,
      roles: [],
      lastLogin: undefined,
      lastUpdate: undefined,
      accessToken: ''
}
  }
  deserialize = (data: any): Athlete => {
      this.id = data.id
      this.email = data.email
      this.name = data.name
      this.lastLogin = data.last_login
      this.lastUpdate = data.last_update
      this.perfLevel = data.perf_level

      data.roles.forEach( (roleInd: number) => {
          if (roleInd === 1) {
              this.roles.push(AthleteRole.Player)
          } else if (roleInd === 2) {
            this.roles.push(AthleteRole.Goalie)
          } else if (roleInd === 3) {
              this.roles.push(AthleteRole.Referee)
          }
      })
      if (data.access_token) {
          this.accessToken = data.access_token
      }
      return this
  }

  serialize = (athlete: Athlete): any => {
    throw new Error('Method not implemented.')
  }

  roleNames = () => {
    return this.roles.map((role_id) => AthleteRole[role_id])
  }
}