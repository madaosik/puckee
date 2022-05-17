export { default as GameAdminForm } from './GameAdminForm'
export { default as GameAdminAvailableGroups } from './GameAdminAvailableGroups'
export { default as GameAdminRecentlyOrganizedGames } from './GameAdminRecentlyOrganizedGames'
export { default as GameAdminFinancialEstimate } from './GameAdminFinancialEstimate'
export { default as GameAdminParticipants } from './GameAdminParticipants'

import { IAthlete } from 'puckee-common/types';

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

//   export const initPlayers = () : IAthlete[] => {
//     return [
//         {
//             "id": 18,
//             "email": "rebecca79@gmail.com",
//             "name": "Melissa",
//             "surname": "Myers",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 20,
//             "email": "qmonroe@gmail.com",
//             "name": "Shelly Lowery",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 32,
//             "email": "melodychandler@yahoo.com",
//             "name": "Nicholas Peck",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 35,
//             "email": "ymora@hotmail.com",
//             "name": "Adam Long",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 39,
//             "email": "obolton@hotmail.com",
//             "name": "Kathleen Stark",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 56,
//             "email": "harrisemily@adkins.com",
//             "name": "Andrea Barry",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 57,
//             "email": "shawnwoods@haley.com",
//             "name": "Tasha Hall",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 86,
//             "email": "srodriguez@hotmail.com",
//             "name": "Seth Michael",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 88,
//             "email": "jessicawright@hobbs-osborn.com",
//             "name": "Bryan Logan",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 100,
//             "email": "cunninghamdavid@yahoo.com",
//             "name": "Nancy Parks",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 101,
//             "email": "riveramary@wright.com",
//             "name": "Jonathan Howell",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 114,
//             "email": "steven08@yahoo.com",
//             "name": "Brittney Guerrero",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 120,
//             "email": "hwells@williams.com",
//             "name": "Michael Murphy",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 132,
//             "email": "james61@yahoo.com",
//             "name": "Jody White",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 134,
//             "email": "qgibbs@wong.com",
//             "name": "Kathleen Miller",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 171,
//             "email": "figueroajames@meyer.biz",
//             "name": "Beverly Underwood",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 177,
//             "email": "arowe@gmail.com",
//             "name": "Sharon Chavez",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 188,
//             "email": "omar81@gmail.com",
//             "name": "Mary Schmidt",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         },
//         {
//             "id": 384,
//             "email": "wscott@taylor-robertson.info",
//             "name": "Whitney Montgomery",
//             "last_login": "null",
//             "last_update": "2022-04-22T10:38:57",
//             "follow": {
//                 "followed": true,
//                 "opt_out_mode": false
//             }
//         }
//     ]
// }