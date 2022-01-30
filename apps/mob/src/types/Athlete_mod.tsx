import { IAthlete, Serializable, AthleteRole } from ".";

export class Athlete implements Serializable<Athlete>, IAthlete {
    id: number
    email: string
    name: string
    lastLogin: Date
    lastUpdate: Date
    roles: AthleteRole[] = []
    perfLevel: number
    accessToken: string

  deserialize = (data: any): Athlete => {
      this.id = data.id
      this.email = data.email
      this.name = data.name
      this.lastLogin = data.last_login
      this.lastUpdate = data.last_update
      this.perfLevel = data.perf_level

      data.roles.forEach( (roleInd: number) => {
          if (roleInd == 1) {
              this.roles.push(AthleteRole.Player)
          } else if (roleInd == 2) {
            this.roles.push(AthleteRole.Goalie)
          } else if (roleInd == 3) {
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
}