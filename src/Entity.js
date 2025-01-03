import { Container, Sprite } from "pixi.js";
import { ACTIONS } from "./Actions";


export class Enity {
    constructor(id,name,position,texture,parent,game){
        this.id= id;
        this.game = game;
        this.name = name;
        this.sprite;
        this.parent = parent;
        this.position = position;
        this.width;
        this.height;
        this.anchor;
        this.scaleX;
        this.scaleY;
        this.rotation;
        this.texture = texture;
        this.currentFrame = 0;
        this.mouseGrabbed = false;
        this.zIndexShift;
        this.init();
    }

    init(){
        this.draw();
        this.hoverListener();
    }

    update(){
        this.updateSpritePosition();
    }

    hoverListener(){
        this.sprite.on('mouseover', (e) =>{
            switch (this.game.action) {
                case ACTIONS.MOVE:
                    if(this.game.selectedEntity == undefined || this.game.selectedEntity == null){
                        this.sprite.tint = 'orange';
                        this.setAlpha(0.8);
                    }
                    break;
                case ACTIONS.SCALE:
                    if(this.game.selectedEntity == undefined || this.game.selectedEntity == null){
                        this.sprite.tint = 'red';
                        this.setAlpha(0.8);
                    }
                    break;
                default:
                    break;
            }

        })
        this.sprite.on('mouseout', (e) =>{
            this.sprite.tint = 'white';
            this.setAlpha(1);
        })
        this.sprite.on('pointerdown', (e) =>{
            this.game.selectedEntity = this;
        })
    }
    draw(){
        this.sprite = new Sprite({texture:this.texture, label: this.name});
        this.sprite.sortableChildren = true;
        this.sprite.eventMode = "dynamic";
        this.sprite.anchor.set(0.5, 1);
        this.sprite.position.set(this.position.x, this.position.y);
        this.sprite.zIndex = this.sprite.y;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.zIndexShift = this.sprite.height/10;
        this.parent.addChild(this.sprite);
    }

    setAlpha(value){
        this.sprite.alpha = value;
    }

    updateSpritePosition(x,y){
        this.sprite.position.x = x;
        this.sprite.position.y = y+50;
    }
    updateZIndex(){
        this.sprite.zIndex = this.sprite.y;
    }
}