import { IGame, Serializable } from ".";

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

export type SelectedAthleteRole = {value: number, label: string}
export type AthleteRoleOption = SelectedAthleteRole | unknown


export interface IAthlete {
  id: number,
  email: string,
  name: string,
  password: string | undefined,
  roles: [{id: number, skill_level: number}] | [],
  last_login: string,
  last_update: string,
  accessToken: string | undefined
}

export class Athlete implements Serializable<Athlete>, IAthlete {
    id: number
    email: string
    name: string
    password: undefined
    last_login: string
    last_update: string
    roles: [{id: number, skill_level: number}] | []
    skill_level: number
    accessToken: string


//   static emptyAthlete = () : IAthlete => {
//     return {
//       id: undefined,
//       email: '',
//       name: '',
//       password: '',
//       perfLevel: undefined,
//       roles: [],
//       lastLogin: undefined,
//       lastUpdate: undefined,
//       accessToken: ''
// }
  deserialize = (data: any): Athlete => {
      // let newAthlete = Object.assign(new Athlete(), JSONdata)
      this.id = data.id
      this.email = data.email
      this.name = data.name
      this.last_login = data.last_login
      this.last_update = data.last_update
      this.skill_level = data.skill_level
      this.roles = data.roles
      // console.log(data.roles)
      // data.roles.forEach( (role: IAthlete}) => {
      //   if (role.id == AthleteRole.Player) {
      //         this.roles.push(AthleteRole.Player)
      //     } else if (role.id == AthleteRole.Goalie) {
      //       this.roles.push(AthleteRole.Goalie)
      //     } else if (role.id  == AthleteRole.Referee) {
      //         this.roles.push(AthleteRole.Referee)
      //     }
      // })
      // console.log(this.roles)
      // if (data.access_token) {
      //     this.accessToken = data.access_token
      // }
      return this
  }

  serialize = (athlete: Athlete): any => {
    throw new Error('Method not implemented.')
  }

  roleNames = () => {
    return this.roles.map((role_id) => AthleteRole[role_id])
  }
}

export const attendanceRole = (user: Athlete, game: IGame) : AthleteRole | undefined => {
  var gameRole : AthleteRole | undefined = undefined
  user.roles.forEach ( role => {
    switch (role.id) {
        case AthleteRole.Player: {
            game.players.some (player => player.id == user.id) ? gameRole = AthleteRole.Player : undefined
            break
        }
        case AthleteRole.Goalie: {
            game.goalies.some (goalie => goalie.id == user.id) ? gameRole = AthleteRole.Goalie : undefined
            break
        }
        case AthleteRole.Referee: {
            game.referees.some (referee => referee.id == user.id) ? gameRole = AthleteRole.Referee : undefined
            break
        }
    }
  })
  return gameRole
}