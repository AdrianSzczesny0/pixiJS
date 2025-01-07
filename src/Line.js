import { Graphics } from "pixi.js";


export class Line{
    constructor(id,x,y,w,h,parent){
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.parent = parent;
        this.init();
    }
    init(){
        this.draw();
        this.hoverListener();
    }
    draw(){
        this.graphic = new Graphics({label: `line-${this.id}` , interactive:true})
        this.graphic.rect(this.x, this.y, this.w, this.h);
        this.graphic.fill('white');
        this.graphic.alpha = 0.2;
        this.parent.addChild(this.graphic);
    }
    hoverListener(){
        this.graphic.on('mouseover', (e) =>{
            console.log('HOVERING OVER LINE');
            // this.graphic.tint='Green';
        });
        this.graphic.on('mouseout', (e) =>{
            console.log('HOVERING OVER LINE');
            // this.graphic.tint='white';
        });
    }
    hide(){
        this.graphic.alpha = 0;
        this.graphic.tint = 'white';
    }
    show(){
        this.graphic.alpha = 1;
    }
}