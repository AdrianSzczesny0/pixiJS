import { Application } from "pixi.js";
import { Scene } from "./Scene";



export class App{
    constructor(){
        this.enemyList = [];
        this.playerTower = [];
        this.scene;
        this.app;
        this.init();
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
            this.scene = new Scene(this.app);
        }


        this.app.ticker.add(function(ticker){

            // code updated every frame here
        });
        
    }
}