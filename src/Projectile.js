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
    constructor(id,startingX,startingY,type,parent){
        this.id =id;
        this.startingPosition = {
            x: startingX,
            y: startingY
        };
        this.parent = parent;
        this.x;
        this.y;
        this.type = type;
        this.isActive = true;
        this.isReset = false;
        this.atack;
        this.moveSpeed = 10;
        this.earthTexture;
        this.waterTexture;
        this.fireTexture;
        this.windTexture;
        this.sprite;
        this.lifeTimeCounter = 0;
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
            this.sprite = new Sprite(this.earthTexture);
            this.sprite.position.set(this.x, this.y);
            this.sprite.scale.set(2,2);
            this.parent.addChild(this.sprite);
            this.sprite.visible = false;
            break;
        }
    }

    update(){
        this.lifeTimeCounter++;
        if(this.isActive){
            this.move();
            this.checkForColision();
        }
        if(!this.isActive && this.sprite.visible){
            this.sprite.visible = false;
        }
        if(this.lifeTimeCounter>= 500){
            this.reset();
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

    reset(){
        this.setAtack(0)
        this.setMoveSpeed(0);
        this.x = this.startingPosition.x;
        this.y = this.startingPosition.y;
        createEvent(EVENTS.PROJECTILE.RESET,this.id);
        this.sprite.visible = false;
        this.lifeTimeCounter = 0;
    }

    setMoveSpeed(value){
        this.moveSpeed = value;
    }

    setActive(){
        this.isActive = true;
        this.sprite.visible = true;
    }

    setInactive(){
        this.isActive = false;
        this.sprite.visible = false;
    }

    setAtack(value){
        this.atack = value;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

}