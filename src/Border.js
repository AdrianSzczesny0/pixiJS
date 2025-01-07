import { Container, Graphics } from "pixi.js";
import { Line } from "./Line";


export class Border{
    constructor(x,y,w,h,parent){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.graphic;
        this.leftLine;
        this.parent = parent;
        this.left;
        this.right;
        this.top;
        this.right;
        this.init()
    }

    init(){
        this.draw();
    }

    draw(){
        this.graphic = new Graphics();
        this.graphic.rect(0, 0, this.w, this.h);
        this.graphic.alpha = 1;
        this.graphic.stroke({ width: 2, color: 0xff00ff });
        // this.top = new Line(1,10,10,this.graphic.width-10, 5, this.parent);
        // this.bot = new Line(1,10,this.graphic.height-10,this.graphic.width-10, 5, this.parent);
        // this.left = new Line(1,10,10,10, this.graphic.height-10, this.parent);
        // this.right = new Line(1,this.graphic.width-10,10,10, this.graphic.height-10, this.parent);
    }

    update(){
        
    }
    hideBorders(){
        this.left.hide();
        this.right.hide();
        this.top.hide();
        this.bot.hide();
    }
    showBorders(){
        this.left.show();
        this.right.show();
        this.top.show();
        this.bot.show();
    }



}