import { Graphics } from "pixi.js";
import { Entity } from "./Entity";
import { TowerType } from "./Types";


export class Tower{
    constructor(x,y,w,h,towerType,towerDetails,parent){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.towerType = towerType;
        this.atk = towerDetails.atk;
        this.currentHp = towerDetails.hp;
        this.atackSpeed = towerDetails.atackSpeed;
        this.sprite;
        this.takeDmg = false;
        this.atack = false;
        this.currentTarget = null;
        this.init(parent);
    }
    init(parent){
        this.drawTower(parent);
    }
    drawTower(parent){
        const tower = new Graphics()
        graphic.rect(this.x, this.y, this.w, this.h);
        switch (this.towerType) {
            case TowerType.EARTH:
                graphic.fill('brown');
                break;
            case TowerType.WATER:
                graphic.fill('blue');
                break;
            case TowerType.FIRE:
                graphic.fill('red');
                break;
            case TowerType.WIND:
                graphic.fill('green');
                break;
            default:
                break;
        }
        parent.addChild(graphic);
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