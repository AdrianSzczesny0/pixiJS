import { Container, Graphics } from "pixi.js";


export class Border{
    constructor(x,y,w,h,parent){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.graphic;
        this.parent = parent;
        this.init()
    }

    init(){
        this.draw();
    }

    draw(){
        this.graphic = new Graphics();
        this.graphic.rect(0, 0, this.w, this.h);
        // this.graphic.pivot.set(2, 1);
        this.graphic.fill(0x650a5a);
        this.graphic.alpha = 0.025;
        this.graphic.stroke({ width: 2, color: 0xff00ff });
        
        this.parent.addChild(this.graphic);
    }
    update(){
        
    }

    updatePosition(newX, newY){
        this.x = newX;
        this.y = newY;
        this.graphic.position.x = this.x;
        this.graphic.position.y = this.y;
    }

}