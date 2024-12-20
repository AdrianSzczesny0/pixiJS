import { Assets, Sprite } from "pixi.js";

export const EnemyState = {
    IDLE: 'IDLE',
    WALKING: 'WALKING',
    ATACKING: 'ATACKING',
    HIT:'HIT',
}


export class Enemy {
    constructor(startingX,startingY,enemyType,level,parent){
        this.parent = parent;
        this.initialPosition= {
            x: startingX,
            y: startingY
        };
        this.x = startingX;
        this.y = startingY;
        this.enemyType = enemyType;
        this.state = EnemyState.HIT;
        this.sprite;
        this.stats = {
            currentHp : 100,
            moveSpeed: 5

        }
        this.level = level;
        this.isActive = true;
        this.receiveDmg= 0;
        this.init();
        this.pushBackTimer = 0;
    }

    init(){
        this.state = EnemyState.HIT;
        this.draw();
    }

    async draw(){
        const enemeyTexture = await Assets.load("./src/assets/enemy.png");
        this.sprite = new Sprite(enemeyTexture);
        this.sprite.scale.set(2.5,3);
        this.sprite.position.set(this.x, this.y);
        this.parent.addChild(this.sprite);
    }

    reset(){
        this.x = this.initialPosition.x;
        this.y = this.initialPosition.y;
    }

    move(){
        if(this.state == EnemyState.WALKING){
            if (this.sprite!= undefined){
                this.sprite.position.x-= this.stats.moveSpeed;
            }
            
        }
    }

    pushBack(){
        this.pushBackTimer++;
        if(this.pushBackTimer>10){
            this.pushBackTimer = 0;
            this.state = EnemyState.WALKING;
        }
        if (this.sprite!= undefined){
            this.sprite.position.x+=20;
        }
        
    }

    hit(){
        this.pushBack();
        this.stats.currentHp-= this.receiveDmg;
        if(this.stats.currentHp<=0){
            this.isActive = false;
        }

    }

    stateHandler(){
        switch (this.state) {
            case EnemyState.IDLE:
                break;
            case EnemyState.WALKING:
                this.move();
                break;
            case EnemyState.HIT:
                this.hit();
                break;
            default:
                break;
        }
    }

    update(){
        this.stateHandler();
    }
}