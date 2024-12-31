import { Application,Text } from "pixi.js";
import { Scene } from "./Scene";
import { EVENTS } from "./Events";
import { Shop } from "./ui/Shop";
import { TowerType } from "./Types";
import { createEvent } from "./Utils";
import { Enemy, EnemyState } from "./Enemy";
import { PROJECTILE_TYPE, Projectile } from "./Projectile";
import { TextObjectPooler } from "./TextObjectPooler";



export class App{
    constructor(){
        this.score = 0;
        this.gold = 500;
        this.wave = 1;
        this.enemiesActive = [];
        this.enemiesInactive = [];
        this.playerTowers = [];
        this.activeProjectiles = [];
        this.projectilePool = [];
        this.scene;
        this.app;
        this.selectedTileId = -1;
        this.selectedTowerAtShop = 0;
        this.tileAmount = 0 ; 
        this.init();
        this.isShopOpened = false;
        this.isTowerDetailsOpened = false;
        this.textObjectPooler = undefined;
        this.shopOptions = document.querySelectorAll('.shopOption');
        this.closeButton = document.querySelector('.closeBtn');
        this.buyButton = document.querySelector('.buyBtn');
        this.shopModal = document.querySelector('.shopModal');
        this.scoreValue = document.querySelector('.scoreValue');
        this.goldValue = document.querySelector('.goldValue');
        this.waveValue = document.querySelector('.waveValue');
        this.towerDetails = document.querySelector('.towerDetails');
        this.towerCost = document.querySelector('.towerCost');
        this.buyPrice = 0;
        this.towerDescription = '';


    }
    async getTowerList(){
        return this.playerTowers;
    }
    
    async moveMobs(){
        this.enemiesInactive.forEach(mob =>{
            mob.update();
        })
    }
    async addGameEventListeners(){

        // TILE EVENTS

        window.addEventListener(EVENTS.TILE.OVER, (e) =>{
            e.detail.data.changeAlpha(0.5);
        })
        window.addEventListener(EVENTS.TILE.OUT, (e) =>{
            e.detail.data.changeAlpha(0.1);
        })
        window.addEventListener(EVENTS.TILE.CLICK, (e) =>{

            
            let isTileSelected = e.detail.data.isSelected;
            this.scene.tiles.setAllTilesStateToDefault();
            createEvent(EVENTS.SHOP.CLOSE);
            createEvent(EVENTS.TOWER.CLOSE);
            if(e.detail.data.towerType == TowerType.NONE){
                createEvent(EVENTS.SHOP.OPEN);
            }else{
                createEvent(EVENTS.TOWER.OPEN);
            }

            if(isTileSelected){
                e.detail.data.changeAlpha(0.1);
                e.detail.data.deselect();
                createEvent(EVENTS.TOWER.CLOSE);
                createEvent(EVENTS.SHOP.CLOSE);
            }else{
                e.detail.data.changeAlpha(1);
                e.detail.data.select();
                this.selectedTileId = e.detail.data.id;
            }
            this.buyPrice = 0;
            // console.log(this.scene.tiles.getTileByID(this.selectedTileId));
            // console.log(this);
        })

        // Tower events
        window.addEventListener(EVENTS.TOWER.OPEN, (e) =>{
            // console.log('tower details opened');
        });

        window.addEventListener(EVENTS.TOWER.CLOSE, (e) =>{
            // console.log('tower details closed');
        });

        window.addEventListener(EVENTS.TOWER.SELL, (e) =>{
            // console.log('tower sell');
        });

        window.addEventListener(EVENTS.TOWER.UPGRADE, (e) =>{
            // console.log('tower upgrade');
        });

        window.addEventListener(EVENTS.TOWER.DRAW, (e) =>{

            this.scene.tiles.getTileByID(this.selectedTileId).drawTower();
            this.playerTowers.push(this.scene.tiles.getTileByID(this.selectedTileId).tower);

        });

        window.addEventListener(EVENTS.TOWER.ATACK, (e) =>{
            this.enemiesActive.forEach(enemy => {
                if(enemy.sprite.position.x <=window.innerWidth-200){
                    const data = e.detail.data;
                    if(this.projectilePool.length>0){
                        const projectile = this.projectilePool[0];
                        projectile.reset(data.x, data.y, data.towerDetails);
                        projectile.setAtack(data.towerDetails.atack.curent);
                        moveFromListToList(this.projectilePool,this.activeProjectiles,0);
                    }
                }
            });
        });

        // PROJECTILE EVENTS
        window.addEventListener(EVENTS.PROJECTILE.RESET, (e) =>{
            let index = e.detail.data;
            for (let i = 0; i < this.activeProjectiles; i++) {
                if(this.activeProjectiles[i].id == e.detrail.data){
                    let projectile = this.activeProjectiles[i];
                    moveFromListToList(this.activeProjectiles,this.projectilePool, index);
                }
            }
            // console.log(this.projectilePool);
        });


        // SHOP Events
        window.addEventListener(EVENTS.SHOP.OPEN, (e) =>{
            // console.log('Shop opened');
            this.shopModal.classList.remove('hidden');
            this.towerCost.innerHTML = 0;
            this.towerDetails.innerHTML = '';
        });

        window.addEventListener(EVENTS.SHOP.CLOSE, (e) =>{
            // console.log('Shop closed');
            this.deselectAllOptions(this.shopOptions);
            this.scene.tiles.setAllTilesStateToDefault();
            this.shopModal.classList.add('hidden');
            this.setShopDetails('0');
        });

        window.addEventListener(EVENTS.SHOP.BUY, (e) =>{
            // console.log('tower buy');
            let selectedTile = this.scene.tiles.getTileByID(this.selectedTileId);

            if(this.selectedTileId >= 0 && this.selectedTowerAtShop> 0){
                if(selectedTile.towerType == TowerType.NONE){
                    if(this.gold>= this.buyPrice){
                        this.gold -= this.buyPrice;
                        this.goldValue.innerHTML = this.gold;
                        this.setTowerType(this.selectedTowerAtShop, selectedTile);
                        createEvent(EVENTS.TOWER.DRAW);
                        console.log(selectedTile)
                        this.selectedTileId = -1;
    
                    }else{
                        console.log('NOT ENOUGHT GOLD');
                    }
                }else{
                    // tower already on given tile
                }
            }
            
            this.selectedTowerAtShop = 0;
            this.buyPrice = 0;
        });



        // SHOP OPTION CLICK
        this.shopOptions.forEach( option =>{
            option.addEventListener('click',(e)=>{
                this.deselectAllOptions(this.shopOptions); 
                if(e.id = option.id){
                    if(this.selectedTowerAtShop == e.id){
                        this.deselectAllOptions(this.shopOptions);
                        this.selectedTowerAtShop = -1;
                    }else{
                        this.selectOption(e.target);
                        this.selectedTowerAtShop = e.id;
                        this.setShopDetails(this.selectedTowerAtShop);
                    }
                }
            })
        })

        // SHOP CLOSE BUTTON EVENT LISTENER
        this.closeButton.addEventListener('click', (e)=>{
            createEvent(EVENTS.SHOP.CLOSE);

        })

        this.buyButton.addEventListener('click', (e)=>{
            createEvent(EVENTS.SHOP.BUY);
        })


        // 
    }
    deselectAllOptions(optionList){
        optionList.forEach( option =>{
            option.classList.remove('selected')
        })
    }
    selectOption(webElement){
        webElement.classList.add('selected');
    }
    setInitValues(){
        this.scoreValue.innerHTML = 0;
        this.goldValue.innerHTML = 500;
        this.waveValue.innerHTML = 1;
    }

    setTowerType(id,tile){
        switch (id) {
            case '1':
                tile.towerType = TowerType.EARTH;
                break;
            case '2':
                tile.towerType = TowerType.WATER;
                break;
            case '3':
                tile.towerType = TowerType.FIRE;
                break;
            case '4':
                tile.towerType = TowerType.WIND;
                break;
        
            default:
                tile.towerType = TowerType.NONE;
                break;
        }
    }

    setShopDetails(id){
        switch (id) {
            case '0':
                this.buyPrice = '';
                this.towerDescription = '';
            case '1':
                this.buyPrice = 100;
                this.towerDescription = 'Earth Tower, shoots earth elemental spikes.'
                break;
            case '2':
                this.buyPrice = 200;
                this.towerDescription = 'Water Tower, shoots water-balls, slowing down enemies.'
                break;
            case '3':
                this.buyPrice = 250;
                this.towerDescription = 'Fire Tower, shoots fire-balls, burning enemies over time.'
                break;
            case '4':
                this.buyPrice = 150;
                this.towerDescription = 'Wind Tower, shoots wind-blades, pushes back hit enemies.'
                break;
        
            default:
                break;
        }
        this.towerDetails.innerHTML = this.towerDescription;
        this.towerCost.innerHTML = this.buyPrice;
    }

    async init(){
        const game = this;
        this.app = new Application();
        await this.app.init({
            width: window.innerWidth-20,
            height: window.innerHeight-20,
            backgroundColor: '#519a82ff'
        })
        document.body.appendChild(this.app.canvas);



        this.scene = new Scene(this.app, this);
            // this.shop = new Shop(this.app.stage);

       




        // this.setShopDetails('0');
        this.towerDetails.innerHTML = '';
        this.addGameEventListeners();
        this.setInitValues();
        createProjectilePool(this.app,this.activeProjectiles,this.projectilePool);
        const inactiveProjectiles = this.projectilePool;
        const activeProjectiles = this.activeProjectiles;
        const playerTower = this.playerTowers;

        let enemyList =createMobs(30,this.app.stage,game);
        game.enemiesActive = enemyList;
        let active = [];
        let waveDelayCounter = 0;



        //test move from list to list
        const list1 = 
        [
            {name:'test0', id:0},
            {name:'test1', id:1},
            {name:'test2', id:2},
        ]
        const list2 = 
        [
            {name:'test3', id:3},
            {name:'test4', id:4},
            {name:'test5', id:5},
        ]
     

        const testText = new Text({text:'test'});
        this.app.stage.addChild(testText);
        game.textObjectPooler = new TextObjectPooler(30,this.game, this.app.stage);

        this.app.ticker.add(function(ticker){
            waveDelayCounter+=ticker.deltaTime;
            if(waveDelayCounter>=31){
                waveDelayCounter = 0;
                // console.log(game.projectilePool);

            }
            moveMobs(enemyList);
            towersAtack(playerTower);
            updateProjectiles(activeProjectiles);
            updateTextObjectws(game.textObjectPooler.active);
            game.textObjectPooler.update();
        });
        
    }
}

function updateTextObjectws(list){
    list.forEach(element =>{
        if(element!=undefined){
            element.update();
        }
    });
}


function updateProjectiles(list){
    list.forEach(element =>{
        if(element!=undefined){
            element.update();
        }
    })
}

function moveMobs(list){
    list.forEach(element =>{
        element.update();
    })
}

function towersAtack(list){
    list.forEach(element =>{
        if(element!=undefined){
            element.update();
        }
        
    })
}

function createMobs(enemyAmount, app,game){
    const list = [];
    for (let i = 0; i < enemyAmount; i++) {
        let enemy = new Enemy(window.innerWidth+500 + i*500, window.innerHeight/1.30,'Small',1,app,game);
        enemy.isActive = false;
        list.push(enemy);
    }
    return list;
}

function createProjectilePool(app,active,inactive){
    for (let i = 0; i < 50; i++) {
        inactive.push(new Projectile(i,500,500,PROJECTILE_TYPE.EARTH,app.stage,active,inactive));
    }
}

function moveFromListToList(fromList,toList, byID){
    // console.log('LISTS BEFORE');
    // console.log(fromList);
    // console.log(toList);
    if(fromList.length> 0){
        toList.push(fromList[0]);
        fromList.splice(0,1);
    }
    // for (let i = 0; i < fromList.length; i++) {
    //     if( fromList[i].id == byID){
    //         toList.push(fromList[i]);
    //         fromList.splice(i,1);
    //         break;
    //     }
    // } 
    // console.log('LISTS AFTER');
    // console.log(fromList);
    // console.log(toList);

}