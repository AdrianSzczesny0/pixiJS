import { Assets, Sprite } from "pixi.js";
import { createEvent } from "./Utils";
import { EVENTS } from "./Events";

export const PROJECTILE_TYPE = {
    EARTH: 'EARTH',
    WATER: 'WIND',
    FIRE: 'FIRE',
    WIND: 'WIND'
}

export class Projectile{
    constructor(id,startingX,startingY,type,parent,activeList,inactiveList){
        this.activeList = activeList;
        this.inactiveList = inactiveList;
        this.id =id;
        this.startingPosition = {
            x: startingX,
            y: startingY
        };
        this.parent = parent;
        this.x;
        this.y;
        this.w;
        this.h;
        this.type = type;
        this.isActive = false;
        this.isReset = false;
        this.atack = 50;
        this.moveSpeed = 15;
        this.earthTexture;
        this.waterTexture;
        this.fireTexture;
        this.windTexture;
        this.sprite;
        this.lifeTimeCounter = 0;
        this.isVisible = false;
        this.tower = undefined;
        this.hitTargets = 0;
        this.init();
    }
    async init(){
        this.earthTexture = await Assets.load('./src/assets/earthAtk.png');
        this.waterTexture = await Assets.load('./src/assets/earthAtk.png');
        this.fireTexture = await Assets.load('./src/assets/earthAtk.png');
        this.windTexture = await Assets.load('./src/assets/earthAtk.png');
        this.x = this.startingPosition.x;
        this.y = this.startingPosition.y;
        this.draw();

    }

    draw(){
        switch(this.type){
            case PROJECTILE_TYPE.EARTH:
            this.sprite = new Sprite({texture: this.earthTexture, label: 'particle' });
            this.sprite.position.set(this.x, this.y);
            this.sprite.scale.set(2,2);
            this.sprite.visible = false;
            this.parent.addChild(this.sprite);
            this.w = this.sprite.width;
            this.h = this.sprite.height;
            break;
        }
    }

    update(){
        if(this.isActive){
            this.lifeTimeCounter++;
            this.move();
            this.checkForColision();
        }
        if(this.lifeTimeCounter >= 300){
            this.setInactive();
            
        }
    }


    move(){
        if(this.isActive){ 
            if(this.sprite!=undefined){
                this.sprite.position.x += 0.5*this.moveSpeed;
            }
        }
    }

    checkForColision(){

    }


    reset(x,y,tower){
        this.tower = tower;
        console.log(this.tower);
        this.isActive = true;
        this.isVisible = true;
        this.sprite.visible = true;
        this.sprite.position.x = x+100;
        this.sprite.position.y = y;
        this.x = x;
        this.y = y;
        this.moveSpeed = tower.projectileSpeed;
    }

    setMoveSpeed(value){
        this.moveSpeed = value;
    }

    setInactive(){
        this.lifeTimeCounter = 0;
        this.setAtack(0)
        this.isActive = false;
        for (let i = 0; i < this.activeList.length; i++) {
            if(this.activeList[i] == this){
                this.activeList.splice(i,1);
            };
        }
        this.inactiveList.push(this);
        this.sprite.position.y = 100;
    }
    

    setAtack(value){
        this.atack = value;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

}