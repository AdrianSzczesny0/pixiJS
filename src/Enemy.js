import { Assets, Sprite } from "pixi.js";
import { TowerType } from "./Types";

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
        this.state = EnemyState.WALKING;
        this.sprite;
        this.stats = {
            currentHp : 120,
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
        this.isBurning = false;
        this.isSlowed = false;
        this.slowTimer = 0;
        this.slowAmount = 0;
        this.burningTimer = 0;
        this.burAmount = 0;
        this.burnDelay = 0;
        this.pushbackForce = 0 ;
        this.lastDmgDealer = undefined;

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
        this.sprite.zIndex = this.sprite.position.y;
    }

    reset(){
        this.x = this.initialPosition.x;
        this.y = this.initialPosition.y;
        this.sprite.zIndex = this.sprite.position.y;
    }

    move(){
        if(this.state == EnemyState.WALKING){
            if (this.sprite!= undefined){
                this.sprite.position.x-= (this.stats.moveSpeed - this.slowAmount);
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
        // if(this.pushBackTimer>3){
            
        // }
        if(this.pushBackTimer>5){
            this.pushBackTimer = 0;
            this.state = EnemyState.WALKING;
            this.drawDmgTaken(this.receiveDmgAmount,"white");
            this.stats.currentHp-= this.receiveDmgAmount;
            this.receiveDmgAmount = 0;
            this.receiveDmg = false;
            this.invulnerable = false;
        }
        if (this.sprite!= undefined){
            this.sprite.position.x+=this.pushbackForce;
        }
        
    }

    hit(){
        this.pushBack();
    }

    drawDmgTaken(amount,color){
        this.game.textObjectPooler.moveToActivePool(color,amount, this.sprite.x, this.sprite.y);
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
            for (let i = 0; i < this.game.activeProjectiles.length; i++) {
                let isCollision = this.collisionCheck(this, this.game.activeProjectiles[i]);
                if(isCollision){
                    let towerType = this.game.activeProjectiles[i].tower.type;
                    this.pushbackForce = this.game.activeProjectiles[i].tower.pushbackForce;
                    switch (towerType) {
                        case TowerType.EARTH:
                            break;
                        case TowerType.WATER:
                            this.isSlowed = true;
                            break;
                        case TowerType.FIRE:
                            this.isBurning = true;
                            this.burnAmount = 5;
                            break;
                        case TowerType.WIND:
                            break;
                        default:
                            break;

                    }
                    if(this.lastDmgDealer != this.game.activeProjectiles[i]){
                        if(this.game.activeProjectiles[i].sprite.visible){
                            this.lastDmgDealer = this.game.activeProjectiles[i];
                            this.receiveDmgAmount = this.game.activeProjectiles[i].atack;
                            this.state= EnemyState.HIT;
                        }
                        if(towerType!=TowerType.WATER){
                            this.game.activeProjectiles[i].setInactive();
                        }
                        break;
                        
                    }
                }
            }
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
        this.checkForCollision();
        this.stateHandler();
        this.collisionCounter+=0.1;
        this.slow();
        this.burn();
        
    }

    burn(){
        if(this.isBurning){
            this.burningTimer+=0.1;
        }
        if(this.burningTimer>=10){
            this.isBurning = false;
            this.burningTimer = 0;
            this.burnAmount = 0;
        }
        if(this.isBurning){
            this.burnDelay+=0.1;
            if(this.burnDelay>=2){
                this.stats.currentHp -=this.burAmount;
                this.burnDelay = 0;
                this.drawDmgTaken(this.burnAmount,'red');
            }
        }
    }

    slow(){
        if(this.isSlowed){
            this.slowAmount = 2;
            this.slowTimer+=0.1;
        }
        if(this.slowTimer>=4){
            this.isSlowed = false;
            this.slowTimer = 0;
            this.slowAmount = 0;
        }
    }

    flash(color){
        this.sprite.tint = (color);
    }
}