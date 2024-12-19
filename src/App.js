import { Application } from "pixi.js";
import { Scene } from "./Scene";
import { EVENTS } from "./Events";
import { Shop } from "./ui/Shop";
import { TowerType } from "./Types";
import { createEvent } from "./Utils";



export class App{
    constructor(){
        this.enemyList = [];
        this.playerTower = [];
        this.scene;
        this.app;
        this.selectedTileId = -1;
        this.tileAmount = 0 ; 
        this.init();
        this.isShopOpened = false;
        this.isTowerDetailsOpened = false;
        this.shopModal = document.querySelector('.shopModal');
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
                console.log(e.detail.data);
            }
        })

        // Tower events
        window.addEventListener(EVENTS.TOWER.OPEN, (e) =>{
            console.log('tower details opened');
        });

        window.addEventListener(EVENTS.TOWER.CLOSE, (e) =>{
            console.log('tower details closed');
        });

        window.addEventListener(EVENTS.TOWER.SELL, (e) =>{
            console.log('tower sell');
        });

        window.addEventListener(EVENTS.TOWER.UPGRADE, (e) =>{
            console.log('tower upgrade');
        });


        // shop Events
        window.addEventListener(EVENTS.SHOP.OPEN, (e) =>{
            console.log('Shop opened');
            this.shopModal.classList.remove('hidden');

        });
        window.addEventListener(EVENTS.SHOP.CLOSE, (e) =>{
            console.log('Shop closed');
            this.shopModal.classList.add('hidden');
        });
        window.addEventListener(EVENTS.SHOP.BUY, (e) =>{
            console.log('tower buy');
        });

        

        // 
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

        console.log(this.scene.tiles);


        this.addGameEventListeners();
        this.app.ticker.add(function(ticker){

            // code updated every frame here
        });
        
    }
}