import { Graphics } from "pixi.js";
import { EVENTS } from "./Events";
import { createEvent } from "./Utils";
import { TowerType } from "./Types";

export class Tile {
    constructor(id,x,y,size,parent,app){
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.sprite;
        this.init(parent);
        this.app = app;
        this.isSelected = false;
        this.tower = TowerType.NONE;

    }
    init(parent){
        this.drawTile(parent);
        this.addPointerOverEvent();
        this.addPointerOutEvent();
        this.addPointerDownEvent();
    }
    drawTile(parent){
        const graph = new Graphics({interactive:true,interactiveChildren:true})
        .rect(this.x, this.y, this.size, this.size)
        .fill('white');
        graph.alpha = 0.1;
        this.sprite = graph;
        parent.addChild(graph);
    }
    addPointerOverEvent(){
        this.sprite.on('pointerover', (e)=>{
            createEvent(EVENTS.TILE.OVER,this);
        });
    }

    addPointerOutEvent(){
        this.sprite.on('pointerout', (e)=>{
            createEvent(EVENTS.TILE.OUT,this);
        });
    }

    addPointerDownEvent(){
        this.sprite.on('pointerdown', (e)=>{
            createEvent(EVENTS.TILE.CLICK,this);
        });
    }
    changeAlpha(value){
        if(!this.isSelected){
            this.sprite.alpha = value;
        }
    }
    select(){
        this.isSelected = true;
    }
    deselect(){
        console.log('deselecting tile');
        this.isSelected = false;
    }

}

export class Tiles{
    constructor(columns,startX,startY,parent,app){
        this.app = app;
        this.columns = columns;
        this.tileList = [];
        this.startX = startX;
        this.startY = startY;
        this.initTiles(parent);
    }

    initTiles(parent){
        let tileWidth = window.innerWidth/15
        for (let x = 0; x < this.columns; x++) {
            const tile = new Tile(x, this.startX + (tileWidth * x * 1.2) , this.startY, tileWidth,parent,this.app);
            this.tileList.push(tile);
        }
    }
    setAllTilesStateToDefault(){
        this.tileList.forEach(tile => {
            tile.sprite.alpha = 0.1;
            tile.isSelected = false;
        });
    }

    getTileByID(id){
        let rTile;
        this.tileList.forEach(tile => {
            if(tile.id == id){
                // console.log(tile);
                rTile = tile;
            }
        });
        return rTile;
    }
}