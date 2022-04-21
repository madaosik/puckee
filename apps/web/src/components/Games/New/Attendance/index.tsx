export { default as NewGamePlayers} from './NewGamePlayers'
export { default as NewGameGoalies} from './NewGameGoalies'
export { default as NewGameReferees} from './NewGameReferees'

export const selectCustomStyles = {
    control: (base: any) => ({
      ...base,
    //   height: 35,
    //   minHeight: 35
        width: 250
    }),
    container: (base: any) => ({
        ...base,
        width: 250
    })
  };