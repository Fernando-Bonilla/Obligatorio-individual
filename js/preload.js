import { User } from "./classUser.js";

/*export let usersPreload = [
        {id: 1, name: 'Fernando', lastName: 'Bonilla', CI: '45268136', phoneNumber: '099679788', imgSrc: 'imgs/fernando.jpg',},
        {id: 2, name: 'Andrea', lastName: 'Gomez', CI: '45268138', phoneNumber: '099679755', imgSrc: 'imgs/andrea.jpg',},
        {id: 3, name: 'John', lastName: 'Scott', CI: '48328138', phoneNumber: '097671751', imgSrc: 'imgs/john.jpg',},
        {id: 4, name: 'Elvio', lastName: 'Gimenez', CI: '43281972', phoneNumber: '091123654', imgSrc: 'imgs/elvio.jpg',},
        {id: 5, name: 'Lorena', lastName: 'Ponce', CI: '51428314', phoneNumber: '093555879', imgSrc: 'imgs/lorena.jpg',},
    ]; */

export let usersPreload = [
    new User (1, 'Fernando', 'Bonilla', '45268136', '099679788', 'imgs/fernando.jpg',),
    new User (2, 'Andrea', 'Gomez', '45268138', '099679755', 'imgs/andrea.jpg',),
    new User (3, 'John', 'Scott', '48328138', '097671751', 'imgs/john.jpg',),
    new User (4, 'Elvio', 'Gimenez', '43281972', '091123654', 'imgs/elvio.jpg',),
    new User (5, 'Lorena', 'Ponce', '51428314', '093555879', 'imgs/lorena.jpg',),
];