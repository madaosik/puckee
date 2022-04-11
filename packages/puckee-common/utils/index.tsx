export { default as playerRoleOptions } from './playerRoleOptions'
export { default as gameLocOptions } from './gameLocOptions'

export const removeSeconds = (time: string) => {
    var tokens = time.split(':').slice(0,2)
    return tokens.join(':')
}

export const getDateFromString = (dateString: string) => {
    const year = +dateString.substring(0, 4);
    const month = +dateString.substring(5, 7);
    const day = +dateString.substring(9, 11);
    return new Date(year, month-1, day)
}
