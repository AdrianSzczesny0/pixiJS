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
    }
    drawTile(parent){
        const graph = new Graphics()
        .rect(this.x, this.y, this.size, this.size)
        .fill('red');
        parent.addChild(graph);
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
        }
    }
}