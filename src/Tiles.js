import { Graphics } from "pixi.js";

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
        graph.alpha = 0.05;
        this.sprite = graph;
        parent.addChild(graph);
    }
    addPointerOverEvent(){
        console.log('event listener');
        this.sprite.on('pointerover', (e)=>{
            console.log('pointerOver');
            if(!this.isSelected){
                this.sprite.alpha = 0.5;
            }
        });
    }
    addPointerOutEvent(){
        console.log('event listener');
        this.sprite.on('pointerout', (e)=>{
            console.log('pointerOut');
            if(!this.isSelected){
                this.sprite.alpha = 0.05;
            }
        });
    }
    addPointerDownEvent(){
        console.log('event listener');
        this.sprite.on('pointerdown', (e)=>{
            console.log('clicked');
            
            if(!this.isSelected){
                this.isSelected = true;
                this.sprite.alpha = 1;
                this.app.selectedTileId = this.id;
                console.log(this.app.selectedTileId);
            }else {
                this.isSelected = false;
                this.sprite.alpha = 0.5;
                this.app.selectedTileId = this.id;
                console.log(this.app.selectedTileId);
            }
            
        });
        
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
}