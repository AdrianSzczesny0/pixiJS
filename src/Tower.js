import { Assets, Graphics, Sprite } from "pixi.js";
import { Entity } from "./Entity";
import { TowerType } from "./Types";
import { getTowerDetails } from "./TowerDefinitions";


export class Tower{
    constructor(x,y,towerType,parent){
        this.parent= parent;
        this.x = x;
        this.y = y;
        this.towerType = towerType;
        this.towerDetails;
        this.sprite;
        this.takeDmg = false;
        this.atack = false;
        this.currentTarget = null;
        this.init(parent);
    }
    init(){
        this.drawTower();
    }
    async drawTower(){
        switch (this.towerType) {
            case TowerType.EARTH:
                this.towerTexture = await Assets.load("./src/assets/tower_brown.png");
                break;
            case TowerType.WATER:
                this.towerTexture = await Assets.load("./src/assets/tower_blue.png");
                break;
            case TowerType.FIRE:
                this.towerTexture = await Assets.load("./src/assets/tower_red.png");
                break;
            case TowerType.WIND:
                this.towerTexture = await Assets.load("./src/assets/tower_green.png");
                break;
            default:
                break;
        }
        console.log(this.towerTexture);
        this.sprite = new Sprite(this.towerTexture);
        this.sprite.position.set(this.x+45, this.y-180);
        this.parent.addChild(this.sprite);
        this.sprite.scale.set(4);
    }
    update(){
        this.atack();
        this.takeDamage();
    }
    takeDamage(){
        if(this.takeDmg){
            // take damage

            this.takeDmg = false;
        }
    }
    attack(){
        if(this.atack){
            // perform atack
            this.atack = false;
        }
    }
}