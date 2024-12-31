import { Assets, Graphics, Sprite } from "pixi.js";
import { EVENTS } from "./Events";
import { createEvent } from "./Utils";
import { TowerType } from "./Types";
import { Tower } from "./Tower";
import { getTowerDetails } from "./TowerDefinitions";

export class Tile {
    constructor(id,x,y,size,parent,app){
        this.parent = parent;
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.sprite;
        this.init(parent);
        this.app = app;
        this.isSelected = false;
        this.towerType = TowerType.NONE;
        this.towerTexture;
        this.towerSprite;
        this.towerDetails= {
            health:{
                level:1,
                max:0,
                curent:0,
                increasePerLevel: [ 100, 100, 200, 400 ],
                pricePerUpgrade: [ 100,150,200,500 ],
            },
            atack:{
                level:1,
                curent:0,
                increasePerLevel: [ 5, 5, 10, 30 ],
                pricePerUpgrade: [ 100,200,400,700 ],
            },  
            atackSpeed:10
        }

    }
    init(parent){
        this.drawTile(parent);
        this.addPointerOverEvent();
        this.addPointerOutEvent();
        this.addPointerDownEvent();
        this.drawTower();
    }
    drawTile(parent){
        const graph = new Graphics({interactive:true,interactiveChildren:true})
        .rect(this.x, this.y, this.size, this.size)
        .fill('white');
        graph.alpha = 0.1;
        this.sprite = graph;
        parent.addChild(graph);
    }
   async drawTower(){
        this.tower = new Tower(this.x+this.sprite.width/2,this.y + this.sprite.height/1.3,this.towerType,this.parent,this.app);
        this.tower.towerDetails = getTowerDetails(this.towerType);
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