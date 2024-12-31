import { Assets, Graphics, Sprite } from "pixi.js";
import { Tile, Tiles } from "./Tiles";

export class Scene{
    constructor(app,game){
        this.game = game;
        this.tiles;
        this.treeSprite;
        this.init(app);
        this.treelineY = window.innerHeight/1.4;
        this.treelineMaxX = window.innerWidth;
    }
    init(app){
        this.drawBackground(app);
        this.drawTiles(app);
    }
    async drawBackground(app){
        const skyBG = new Graphics()
        skyBG.rect(0,0,window.innerWidth, window.innerHeight/1.5);
        skyBG.fill('#aee1e4ff');
        skyBG.rect(0, window.innerHeight/1.5, window.innerWidth, window.innerHeight);
        skyBG.fill('#519a82ff');
        app.stage.addChild(skyBG);
        this.treeSprite = await Assets.load("./src/assets/tree01.png");
        this.createTree(app,100,this.treelineY+100,2,3);
        this.createTree(app,180,this.treelineY+100,2,2.5);
        this.createTree(app,180,this.treelineY+100,2,2.5);
        this.createTree(app,400,this.treelineY+100,2,2.7);
        this.createTree(app,880,this.treelineY+100,2,2);

        this.createTree(app,this.treelineMaxX-1000,this.treelineY+100,2,2.5);
        this.createTree(app,this.treelineMaxX-300,this.treelineY+100,2,2.5);
        this.createTree(app,this.treelineMaxX-800,this.treelineY+500,2,2.5);
        this.createTree(app,this.treelineMaxX-600,this.treelineY+600,2,2.5);
        this.createTree(app,this.treelineMaxX-700,this.treelineY+630,2,2);

        this.createTree(app,this.treelineMaxX-1000,this.treelineY+100,2,2.5);

        
    }
    drawTiles(app){
        this.tiles = new Tiles(5,window.innerWidth/90, window.innerHeight/1.3,app.stage,this.game);
    }

    createTree(app,x,y,sX,sY){
        const tree = new Sprite({texture:this.treeSprite, label:'tree'});
        tree.position.set(x,y);
        tree.anchor.set(0.5, 1);
        tree.scale.set(sX,sY);
        tree.zIndex = tree.position.y;
        app.stage.addChild(tree);
    }

}