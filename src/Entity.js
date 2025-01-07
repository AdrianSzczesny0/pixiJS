import { Container, Graphics, Point, Polygon, Rectangle, Sprite } from "pixi.js";
import { ACTIONS } from "./Actions";
import { Border } from "./Border";


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
        this.shift = {
            x:0,
            y:0
        }
        this.border;
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
                        this.setAlpha(0.8);
                    }
                    break;
                case ACTIONS.SCALE:
                    if(this.game.selectedEntity == undefined || this.game.selectedEntity == null){
                        this.setAlpha(0.8);
                    }
                    break;
                default:
                    break;
            }
            this.sprite.cursor = 'grab';
        })
        this.sprite.on('mouseout', (e) =>{
            this.sprite.tint = 'white';
            this.setAlpha(1);
        })
        this.sprite.on('pointerdown', (e) =>{
            this.setShift();
            this.game.selectedEntity = this;
            this.setAlpha(0.5);
            this.sprite.tint='white';
        })
    }
    draw(){
        this.sprite = new Sprite({texture:this.texture, label: this.name});
        this.sprite.sortableChildren = true;
        this.sprite.eventMode = "static";
        this.sprite.position.set(this.position.x, this.position.y);
        this.sprite.zIndex = this.sprite.y;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.sprite.hitArea = new Polygon([this.sprite.width*0.33, 0, this.sprite.width*0.66, 0, this.sprite.width*0.66, this.sprite.height, this.sprite.width*0.33, this.sprite.height]);
        this.zIndexShift = this.sprite.height/10;
        this.parent.addChild(this.sprite);
        this.drawBorder();
    }

    setAlpha(value){
        this.sprite.alpha = value;
    }

    updateSpritePosition(x,y){
        this.sprite.position.x = x-this.shift.x;
        this.sprite.position.y = y-this.shift.y;
    }

    updateBorderPosition(){
        this.border.updatePosition(this.sprite.x - this.sprite.width/1.5, this.sprite.position.y - this.sprite.height);
    }

    drawBorder(){
        this.border = new Border(this.sprite.position.x, this.sprite.position.y, this.sprite.width, this.sprite.height, this.sprite);
    }

    setShift(){
        this.shift.x = this.game.mousePosition.x - this.sprite.x;
        this.shift.y = this.game.mousePosition.y - this.sprite.y;
    }
    updateZIndex(){
        this.sprite.zIndex = this.sprite.y;
    }
}