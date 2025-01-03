import { Assets, Graphics, Sprite } from "pixi.js";
import { Entity } from "./Entity";
import { TowerType } from "./Types";
import { getTowerDetails } from "./TowerDefinitions";
import { createEvent } from "./Utils";
import { EVENTS } from "./Events";


export class Tower{
    constructor(x,y,towerType,parent,app){
        this.app = app;
        this.parent= parent;
        this.x = x;
        this.y = y;
        this.towerType = towerType;
        this.towerDetails;
        this.sprite;
        this.takeDmg = false;
        this.atack = false;
        this.currentTarget = null;
        this.projectileList;
        this.atackCounter = 0;
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
        this.sprite = new Sprite({texture:this.towerTexture , label:'tower'});
        this.sprite.position.set(this.x, this.y);
        this.parent.addChild(this.sprite);
        this.sprite.anchor.set(0.5, 1);
        this.sprite.scale.set(3.5);
        this.sprite.zIndex = this.sprite.position.y;
    }
    update(){
        this.checkIfEnemyInRange();
        this.attack();
        this.takeDamage();
    }
    takeDamage(){
        if(this.takeDmg){
            this.takeDmg = false;
        }
    }
    attack(){
        if(this.atack){
            this.atackCounter++;
            if(this.atackCounter >= this.towerDetails.atackSpeed*5){
                createEvent(EVENTS.TOWER.ATACK , {x:this.x, y:this.y, towerDetails:this.towerDetails});
                this.atackCounter = 0;
            }
        }
    }
    checkIfEnemyInRange(){
        if(this.app.enemiesActive.length>0){
            for (let i = 0; i < this.app.enemiesActive.length; i++) {
                if(this.sprite!=undefined){
                    if(this.app.enemiesActive[i].sprite.position.x - this.sprite.position.x <= 2000){
                        this.atack = true;
                        break;
                    }else{
                        this.atack = false;
                    }
                }            
            }
        }else{
            this.atack = false;
        }
    }
}