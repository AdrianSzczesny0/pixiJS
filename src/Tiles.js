import { Graphics } from "pixi.js";

export class Tile {
    constructor(x,y,size,parent){
        this.x = x;
        this.y = y;
        this.size = size;
        this.sprite;
        this.init(parent);
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
        console.log('event listener');
        this.sprite.on('pointerover', (e)=>{
            console.log('test');
            this.sprite.alpha = 0.5;
        });
    }
    addPointerOutEvent(){
        console.log('event listener');
        this.sprite.on('pointerout', (e)=>{
            console.log('test');
            this.sprite.alpha = 0.1;
        });
    }
    addPointerDownEvent(){
        console.log('event listener');
        this.sprite.on('pointerdown', (e)=>{
            console.log('clicked');
            this.sprite.alpha = 1;
        });
    }
}

export class Tiles{
    constructor(columns,startX,startY,parent){
        this.columns = columns;
        this.tileList = [];
        this.startX = startX;
        this.startY = startY;
        this.initTiles(parent);
    }
    initTiles(parent){
        let tileWidth = window.innerWidth/15
        for (let x = 0; x < this.columns; x++) {
            const tile = new Tile(this.startX + (tileWidth * x * 1.2) , this.startY, tileWidth,parent);
            this.tileList.push(tile);
        }
    }
}