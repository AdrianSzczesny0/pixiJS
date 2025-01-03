import { Container, Sprite } from "pixi.js";


export class Enity {
    constructor(name,position,texture,parent){
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
        this.init();
    }

    init(){
        this.draw();
        this.hoverListener();
    }

    update(){
        this.updateSpritePosition();
    }

    draw(){
        this.sprite = new Sprite({texture:this.texture, label: this.name});
        this.sprite.eventMode = "dynamic";
        this.sprite.anchor.set(0.5, 1);
        this.sprite.position.set(this.position.x, this.position.y);
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.parent.addChild(this.sprite);
    }
    hoverListener(){
        this.sprite.on('mouseenter' , (e) =>{
            this.sprite.tint = "red";
            this.sprite.cursor = 'pointer';
        })
        this.sprite.on('pointerdown' , (e) =>{
            this.sprite.tint = "red";
            this.sprite.cursor = 'grab';
            this.mouseGrabbed = true;
        })
        this.sprite.on('pointerup' , (e) =>{
            this.sprite.tint = "red";
            this.sprite.cursor = 'pointer';
            this.mouseGrabbed = false;
        })
        this.sprite.on('mouseleave' , (e) =>{
            this.sprite.tint = "white";
        })
        this.parent.on('pointermove', (e)=>{
            console.log('moving');
            this.updateSpritePosition(e);
        })
    }
    updateSpritePosition(event){
        if(this.mouseGrabbed){
            this.sprite.position.x = event.x;
            this.sprite.position.y = event.y;
        }

    }
}