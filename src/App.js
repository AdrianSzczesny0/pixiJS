import { Application } from "pixi.js";
import { Scene } from "./Scene";
import { EVENTS } from "./Events";



export class App{
    constructor(){
        this.enemyList = [];
        this.playerTower = [];
        this.scene;
        this.app;
        this.selectedTileId = -1;
        this.tileAmount = 0 ; 
        this.init();
    }
    
    async addGameEventListeners(){
        window.addEventListener(EVENTS.TILE.OVER, (e) =>{
            e.detail.data.changeAlpha(0.5);
        })
        window.addEventListener(EVENTS.TILE.OUT, (e) =>{
            e.detail.data.changeAlpha(0.1);
        })
        window.addEventListener(EVENTS.TILE.CLICK, (e) =>{
            this.scene.tiles.setAllTilesStateToDefault();
            e.detail.data.changeAlpha(1);
            e.detail.data.select();
            
        })
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
        }

        console.log(this.scene.tiles);


        this.addGameEventListeners();
        this.app.ticker.add(function(ticker){

            // code updated every frame here
        });
        
    }
}