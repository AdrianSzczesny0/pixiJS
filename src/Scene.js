import { Graphics } from "pixi.js";
import { Tile, Tiles } from "./Tiles";

export class Scene{
    constructor(app){
        this.init(app);
    }
    init(app){
        this.drawBackground(app);
        this.drawTiles(app);
    }
    drawBackground(app){
        const skyBG = new Graphics()
        skyBG.rect(0,0,window.innerWidth, window.innerHeight/1.5);
        skyBG.fill('lightBlue');
        skyBG.rect(0,window.innerHeight/1.5,window.innerWidth, window.innerHeight);
        skyBG.fill('green');
        app.stage.addChild(skyBG);
    }
    drawTiles(app){
        const tiles = new Tiles(5,window.innerWidth/90, window.innerHeight/1.3,app.stage);
    }

}