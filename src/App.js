import { Application } from "pixi.js";
import { Scene } from "./Scene";
import { EVENTS } from "./Events";
import { Shop } from "./ui/Shop";
import { TowerType } from "./Types";
import { createEvent } from "./Utils";



export class App{
    constructor(){
        this.score = 0;
        this.gold = 500;
        this.wave = 1;
        this.enemyList = [];
        this.playerTower = [];
        this.scene;
        this.app;
        this.selectedTileId = -1;
        this.selectedTowerAtShop = 0;
        this.tileAmount = 0 ; 
        this.init();
        this.isShopOpened = false;
        this.isTowerDetailsOpened = false;
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
            if(e.detail.data.tower == TowerType.NONE){
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
            console.log(this.scene.tiles.getTileByID(this.selectedTileId));
            console.log(this);
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
            // console.log('tower upgrade');
            this.scene.tiles.getTileByID(this.selectedTileId).drawTower();
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
                if(selectedTile.tower == TowerType.NONE){
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
                        console.log('i am here');
                        console.log(this);
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
                tile.tower = TowerType.EARTH;
                break;
            case '2':
                tile.tower = TowerType.WATER;
                break;
            case '3':
                tile.tower = TowerType.FIRE;
                break;
            case '4':
                tile.tower = TowerType.WIND;
                break;
        
            default:
                tile.tower = TowerType.NONE;
                break;
        }
    }

    setShopDetails(id){
        console.log('updating tower details');
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
        this.app = new Application();
        await this.app.init({
            width: window.innerWidth-20,
            height: window.innerHeight-20,
            backgroundColor: '#519a82ff'
        })
        document.body.appendChild(this.app.canvas);
        

        { // scene
            this.scene = new Scene(this.app, this);
            // this.shop = new Shop(this.app.stage);
        }




        // this.setShopDetails('0');
        this.towerDetails.innerHTML = '';
        this.addGameEventListeners();
        this.setInitValues();

        this.app.ticker.add(function(ticker){

            // code updated every frame here
        });
        
    }
}