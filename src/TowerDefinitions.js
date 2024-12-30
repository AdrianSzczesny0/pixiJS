import { TowerType } from "./Types";



export const getTowerDetails = (towerType) =>{
    let returnTowerDetails;
    switch (towerType) {
        case TowerType.EARTH:
            returnTowerDetails = {
                type:'EARTH',
                health:{
                    level:1,
                    max:50,
                    curent:100,
                    increasePerLevel: [ 100, 100, 200, 400, 400, 500, 500, 700, 1000 ],
                    pricePerUpgrade:  [ 100, 150, 200, 500, 600, 800, 1000, 1300, 2000  ]
                },
                atack:{
                    level:1,
                    curent:30,
                    increasePerLevel: [ 5, 20, 30, 45, 60, 80, 85, 100, 120 ],
                    pricePerUpgrade: [ 100,200,300,400, 500,700,900, 1500, 2500 ]
                },  
                atackSpeed:10,
                projectileSpeed:10
            }
            break;
        case TowerType.WATER:
            returnTowerDetails = {
                type:'WATER',
                health:{
                    level:1,
                    max:40,
                    curent:40,
                    increasePerLevel: [ 100, 100, 200, 400, 400, 500, 500, 700, 1000 ],
                    pricePerUpgrade:  [ 100, 150, 200, 500, 600, 800, 1000, 1300, 2000  ]
                },
                atack:{
                    level:1,
                    curent:15,
                    increasePerLevel: [ 2, 3, 5, 10, 15, 20, 25, 30, 35 ],
                    pricePerUpgrade: [ 100,200,300,400, 500,700,900, 1500, 2500 ],
                    slowAmount: [ 5, 10, 15, 20, 25, 30, 35, 40, 45]
                },  
                atackSpeed:10,
                projectileSpeed:12
            }
            break;
        case TowerType.FIRE:
            returnTowerDetails = {
                type:'FIRE',
                health:{
                    level:1,
                    max:30,
                    curent:20,
                    increasePerLevel: [ 100, 100, 200, 400, 400, 500, 500, 700, 1000 ],
                    pricePerUpgrade:  [ 100, 150, 200, 500, 600, 800, 1000, 1300, 2000  ]
                },
                atack:{
                    level:1,
                    curent:20,
                    increasePerLevel: [ 5, 10, 15, 25, 35, 45, 55, 60, 75 ],
                    pricePerUpgrade: [ 100,200,300,400, 500,700,900, 1500, 2500 ],
                    burnAmount: [ 5, 10, 15, 20, 25, 30, 35, 40, 45]
                },  
                atackSpeed:8,
                projectileSpeed:15
            }
            break;
        case TowerType.WIND:
            returnTowerDetails = {
                type:'WIND',
                health:{
                    level:1,
                    max:30,
                    curent:30,
                    increasePerLevel: [ 100, 100, 200, 400, 400, 500, 500, 700, 1000 ],
                    pricePerUpgrade:  [ 100, 150, 200, 500, 600, 800, 1000, 1300, 2000  ]
                },
                atack:{
                    level:1,
                    curent:10,
                    increasePerLevel: [ 10, 10, 15, 25, 35, 45, 55, 60, 60 ],
                    pricePerUpgrade: [ 100,200,300,400, 500,700,900, 1500, 2500 ],
                    pushBack: [ 5, 10, 15, 20, 25, 30, 35, 40, 45]
                },  
                atackSpeed:5.5,
                projectileSpeed:30
            }
            break;
        default:
            break;
    }
    return returnTowerDetails;
}
