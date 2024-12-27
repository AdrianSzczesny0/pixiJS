import { Assets, Sprite } from "pixi.js";

export const EnemyState = {
    IDLE: 'IDLE',
    WALKING: 'WALKING',
    ATACKING: 'ATACKING',
    HIT:'HIT',
}


export class Enemy {
    constructor(startingX,startingY,enemyType,level,parent,game){
        this.game = game;
        this.parent = parent;
        this.initialPosition= {
            x: startingX,
            y: startingY
        };
        this.x = startingX;
        this.y = startingY;
        this.w;
        this.h;
        this.enemyType = enemyType;
        this.state = EnemyState.HIT;
        this.sprite;
        this.stats = {
            currentHp : 100,
            moveSpeed: 5
        }
        this.level = level;
        this.isActive = true;
        this.receiveDmgAmount= 0;
        this.init();
        this.pushBackTimer = 0;
        this.collisionCounter = 0;
        this.flashCounter = 0;
        this.receiveDmg = false;
        this.isDead = false;
        this.invulnerable = false;
    }

    init(){
        this.state = EnemyState.WALKING;
        this.draw();
    }

    async draw(){
        const enemeyTexture = await Assets.load("./src/assets/enemy.png");
        this.sprite = new Sprite(enemeyTexture);
        this.sprite.scale.set(2.5,3);
        this.sprite.position.set(this.x, this.y);
        this.parent.addChild(this.sprite);
        this.w = this.sprite.width;
        this.h = this.sprite.height;
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
        this.invulnerable = true;
        this.flash('red');
        if(this.pushBackTimer>3){
            this.flash('white');
            
        }
        if(this.pushBackTimer>7){
            this.invulnerable = false;
        }
        if(this.pushBackTimer>10){
            this.pushBackTimer = 0;
            this.state = EnemyState.WALKING;
        }
        if (this.sprite!= undefined){
            this.sprite.position.x+=20;
            this.sprite.position.y += Math.sin(-this.pushBackTimer);
        }
        
    }

    hit(){
        if(this.receiveDmg){
            this.stats.currentHp-= this.receiveDmgAmount;
            this.receiveDmgAmount = 0;
            this.receiveDmg = false;
        }
        this.pushBack();
        console.log(this.stats.currentHp);
    }

    stateHandler(){
        switch (this.state) {
            case EnemyState.IDLE:
                break;
            case EnemyState.WALKING:
                this.move();
                break;
            case EnemyState.HIT:
                this.receiveDmg = true;
                this.hit();
                break;
            default:
                break;
        }
    }
    checkForCollision(){
        if(this.collisionCounter>=2 && !this.isDead){
            this.game.activeProjectiles.forEach(particle => {
                // console.log(`particle: ${particle}`);
                let isCollision = this.collisionCheck(this, particle);
                // console.log(`collision: ${isCollision}`);
                if(isCollision){
                    this.receiveDmgAmount = particle.atack;
                    console.log(`receive dmhg : ${this.receiveDmgAmount}`);
                    this.state= EnemyState.HIT;
                    console.log(this.state)
                    particle.setInactive();
                }
            });
            this.collisionCounter = 0;
        }
    }
    collisionCheck(obj1,obj2){
        let rect1 = obj1.sprite;
        let rect2 = obj2.sprite;
        return  rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    }

    update(){
        if(this.stats.currentHp<=0){
            this.isActive = false;
            this.sprite.visible = false;
            this.isDead = true;
        }
        this.stateHandler();
        this.collisionCounter+=0.1;
        this.checkForCollision();
    }

    flash(color){
        this.sprite.tint = (color);
    }
}