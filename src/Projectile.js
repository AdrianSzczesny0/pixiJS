import { Assets, Sprite } from "pixi.js";
import { createEvent } from "./Utils";
import { EVENTS } from "./Events";
import { TowerType } from "./Types";

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
        this.animationTime = 0;
        this.init();
    }
    async init(){
        this.earthTexture = await Assets.load('./src/assets/earthAtk.png');
        this.waterTexture = await Assets.load('./src/assets/waterAtk.png');
        this.fireTexture = await Assets.load('./src/assets/fireAtk.png');
        this.windTexture = await Assets.load('./src/assets/windAtk.png');
        this.x = this.startingPosition.x;
        this.y = this.startingPosition.y;
        this.draw();

    }

    draw(){
        switch(this.type){
            case PROJECTILE_TYPE.EARTH:
                this.sprite = new Sprite({texture: this.earthTexture, label: 'particle' });
                break;
            
            case PROJECTILE_TYPE.WATER:
                this.sprite = new Sprite({texture: this.waterTexture, label: 'particle' });
                break;
            case PROJECTILE_TYPE.FIRE:
                this.sprite = new Sprite({texture: this.fireTexture, label: 'particle' });
                break;
            
            case PROJECTILE_TYPE.WIND:
                this.sprite = new Sprite({texture: this.windTexture, label: 'particle' });
                break;  
        }
        this.sprite.position.set(this.x, this.y);
        this.sprite.scale.set(2,2);
        this.sprite.visible = false;
        this.sprite.anchor.set(0.5,0.5);
        this.parent.addChild(this.sprite);
        this.w = this.sprite.width;
        this.h = this.sprite.height;
    }

    update(delta){
        if(this.isActive){
            this.lifeTimeCounter++;
            this.move();
            this.checkForColision();
        }
        if(this.lifeTimeCounter >= 300){
            this.setInactive();
            
        }
        this.animationTime+= 0.01;
        if(this.animationTime>2){
            this.animationTime =0.4;
        }
        this.animate();
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
        this.isActive = true;
        this.isVisible = true;
        this.sprite.visible = true;
        this.sprite.position.x = x+100;
        this.sprite.position.y = y;
        this.sprite.zIndex = this.sprite.position.y;
        this.x = x;
        this.y = y;
        this.moveSpeed = tower.projectileSpeed;
        this.type = tower.type;
        this.setSprite();
    }
    setSprite(){
    switch(this.type){
        case TowerType.EARTH:
            this.sprite.texture = this.earthTexture;
            break;
        
        case TowerType.WATER:
            this.sprite.texture = this.waterTexture;
            break;
        case TowerType.FIRE:
            this.sprite.texture = this.fireTexture;
            break;
        
        case TowerType.WIND:
            this.sprite.texture = this.windTexture;
            break;  
    }
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
        this.sprite.position.x -=500;
    }
    

    setAtack(value){
        this.atack = value;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
    animate(){
        this.sprite.scale.set(1, Math.cos(this.animationTime*3)+1.2);
    }

}